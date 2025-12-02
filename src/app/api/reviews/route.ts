import { supabaseServer } from '@/lib/supabaseServer';
import { NextResponse } from 'next/server';

import rateLimit from '../../../lib/rateLimit';
import { ErrorResponse, ReviewsResponse, SuccessResponse } from '../types';
import VerifyReview from '@/lib/verifyReview';

const limiter = rateLimit({ windowMs: 60 * 10000 });

const s = supabaseServer;

export async function POST(req: Request): Promise<Response> {
	if (!limiter(req) === true)
		return NextResponse.json<ErrorResponse>(
			{ error: 'Too many requests' },
			{ status: 429 },
		);

	const formData = await req.formData();
	const name = formData.get('name') as string;
	const review = formData.get('review') as string;
	const file = formData.get('file') as File | null;

	if (!name || !review || name.length < 3) {
		return NextResponse.json<ErrorResponse>(
			{ error: 'Name and review and avatar cant be empty' },
			{ status: 400 },
		);
	}

	const isValid = await VerifyReview({ name, review, file });

	if (isValid === 'false') {
		return NextResponse.json<ErrorResponse>(
			{ error: 'Content contain forbidden content' },
			{ status: 501 },
		);
	}

	let imageUrl = `${process.env.SUPABASE_AVATAR_BUCKET_URL}default.jpg`;

	if (file) {
		const fileName = `${Date.now()}`;

		const { error: imageError } = await s.storage
			.from('avatar_imgs')
			.upload(fileName, file, {
				cacheControl: '3600',
				upsert: false,
			});

		if (imageError) {
			return NextResponse.json<ErrorResponse>(
				{ error: imageError.message },
				{ status: 503 },
			);
		}

		imageUrl = `${process.env.SUPABASE_AVATAR_BUCKET_URL}${fileName}`;
	}

	const { error } = await s
		.from('postges_table_reviews')
		.insert({
			name,
			review,
			image_url: imageUrl,
		})
		.select();

	if (error) {
		return NextResponse.json<ErrorResponse>(
			{ error: error.message },
			{ status: 505 },
		);
	}

	return NextResponse.json<SuccessResponse<string>>(
		{ success: true },
		{ status: 200 },
	);
}

export async function GET(): Promise<Response> {
	const { data, error } = await s.from('postges_table_reviews').select('*');

	if (error) {
		return NextResponse.json<ErrorResponse>(
			{ error: error.message },
			{ status: 500 },
		);
	}

	return NextResponse.json<SuccessResponse<ReviewsResponse[]>>(
		{ success: true, data },
		{ status: 200 },
	);
}
