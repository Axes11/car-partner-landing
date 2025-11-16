import React from 'react';
import ReviewCard from '@/components/Reviews/review-card';
import reviewData from '@/locales/reviews/reviews.json';

export default function ReviewSection() {
	console.log('Loaded review data:', reviewData);
	const reviews = Array.isArray(reviewData) ? reviewData : [reviewData];

	return (
		<>
			{reviews.map((item, index) => (
				<ReviewCard
					key={index}
					image={item.image}
					nickname={item.nickname}
					review={item.review}
				/>
			))}
		</>
	);
}
