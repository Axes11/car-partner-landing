import axios from 'axios';

interface SendRequestProps {
	name: string;
	review: string;
	file?: File;
}

interface ApiResponse {
	success?: boolean;
	data?: unknown;
	error?: string;
}

export default async function SendReview({
	name,
	review,
	file,
}: SendRequestProps): Promise<'OK' | 'error'> {
	try {
		const form = new FormData();
		form.append('name', name);
		form.append('review', review);
		if (file) form.append('file', file);

		const response = await axios.post<ApiResponse>('/api/reviews', form, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		const { data } = response;

		if (data.success) {
			return 'OK';
		} else {
			return 'error';
		}
	} catch (e) {
		return 'error';
	}
}
