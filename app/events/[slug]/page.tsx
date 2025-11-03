import { Suspense } from "react";
// Components
import EventDetails from "@/components/EventDetails";

const EventDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const slug = params.then(params => params.slug);

	return (
		<main>
			<Suspense fallback={<div>Loading...</div>}>
				<EventDetails params={slug} />
			</Suspense>
		</main>
	)
}

export default EventDetailPage;