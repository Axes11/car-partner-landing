import { ReviewsResponse } from '@/app/api/types';
import axios from 'axios';

export default async function getReviews(): Promise<ReviewsResponse[]> {
	try {
		const response = await axios.get<{
			success: boolean;
			data: ReviewsResponse[];
		}>('/api/reviews');

		return response.data.data || [];
	} catch (e) {
		return [];
	}
}
