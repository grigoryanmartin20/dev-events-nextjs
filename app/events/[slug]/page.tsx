import { notFound } from "next/navigation";
import Image from "next/image";
// Database
import { IEvent } from "@/database";
// Actions
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
// Components
import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({ icon, alt, label }: { icon: string, alt: string, label: string }) => (
	<div className="flex-row-gap-2 items-center">
		<Image src={icon} alt={alt} width={17} height={17} />
		<p>{label}</p>
	</div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: Array<string> }) => (
	<div className="agenda">
		<h2>Agenda</h2>
		<ul>
			{agendaItems.map((item) => (
				<li key={item}>{item}</li>
			))}
		</ul>

	</div>
);

const EventTags = ({ tags }: { tags: Array<string> }) => (
	<div className="flex flex-row gap-1.5 flex-wrap">
		{tags.map((tag) => (
			<div key={tag} className="pill">{tag}</div>
		))}
	</div>
);

const EventDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;

	let event: IEvent | null = null;

	try {
        const request = await fetch(`${BASE_URL}/api/events/${slug}`, {
            next: { revalidate: 60 }
        });

        if (!request.ok) {
            if (request.status === 404) return notFound();

            throw new Error(`Failed to fetch event: ${request.statusText}`);
        }

        const response = await request.json();

        event = response.event;

        if (!event) return notFound();
    } catch (error) {
        return notFound();
    }

	const booking: number = 10;

	const similarEvents = await getSimilarEventsBySlug(slug) as unknown as Array<IEvent>;

	return (
		<section id="event">
			<div className="header">
				<h1>Event Description</h1>
				<p>{event?.description}</p>
			</div>
			<div className="details">
				{/* Left Side - Event Content */}
				<div className="content">
					<Image src={event?.image} alt="Event Banner" width={800} height={800} className="banner" />
					<section className="flex-col-gap-2">
						<h2>Overview</h2>
						<p>{event?.overview}</p>
					</section>
					<section className="flex-col-gap-2">
						<h2>Event Details</h2>
						{/* Event Detail Items Component List */}
						<EventDetailItem icon="/icons/calendar.svg" alt="Date" label={event?.date} />
						<EventDetailItem icon="/icons/clock.svg" alt="Time" label={event?.time} />
						<EventDetailItem icon="/icons/pin.svg" alt="Location" label={event?.location} />
						<EventDetailItem icon="/icons/mode.svg" alt="Mode" label={event?.mode} />
						<EventDetailItem icon="/icons/audience.svg" alt="Audience" label={event?.audience} />
						{/* Event Detail Items Component List End */}
					</section>
					{/* Event Agenda Component */}
					<EventAgenda agendaItems={event?.agenda} />
					{/* Event Agenda Component End */}
					<section className="flex-col-gap-2">
						<h2>About the Organizer</h2>
						<p>{event?.organizer}</p>
					</section>
					{/* Event Tags Component */}
					<EventTags tags={event?.tags} />
					{/* Event Tags Component End */}
				</div>
				{/* Right Side - Booking Form */}
				<aside className="booking">
					<div className="signup-card">
						<h2>Book Your Spot</h2>
						{booking > 0 ? (
							<p className="text-sm">Join {booking} people who have already booked their spot!</p>
						) : (
							<p className="text-sm">Be the first to book your spot!</p>
						)}
						{/* Booking Form Component */}
						<BookEvent />
						{/* Booking Form Component End */}
					</div>
				</aside>
			</div>
			<div className="flex w-full flex-col gap-4 pt-20">
				<h2>Similar Events</h2>
				<div className="events">
					{similarEvents?.length > 0 && similarEvents.map((similarEvent) => (
						/* Event Card Component List */
						<EventCard key={similarEvent.slug} {...similarEvent} />
						/* Event Card Component List End */
					))}
				</div>
			</div>
		</section>
	)
}

export default EventDetailPage;