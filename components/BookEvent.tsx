"use client";

import { useState } from "react";
// Actions
import { createBooking } from "@/lib/actions/booking.actions";

const BookEvent = ({ eventId, slug }: { eventId: string, slug: string }) => {
	const [email, setEmail] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event?.preventDefault();

		const { success } = await createBooking({ eventId, slug, email });

		if (success) setSubmitted(true);
	}

	return (
		<div id="book-event">
			{submitted ? (
				<p>Thank you for signing up!</p>
			) : (
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="email">Email Address</label>
						<input 
							type="email" 
							id="email" 
							placeholder="Enter your email address"
							required
							value={email} 
							onChange={(e) => setEmail(e.target.value)} 
						/>
					</div>
					<button type="submit" className="button-submit">Submit</button>
				</form>
			)}
		</div>
	)
}

export default BookEvent;