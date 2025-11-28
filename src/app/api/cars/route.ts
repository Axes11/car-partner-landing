import { supabase } from '@/lib/connect';
import { NextResponse } from 'next/server';
import { Car, ErrorResponse, SuccessResponse } from '../types';

const s = supabase;

export async function GET(): Promise<
	NextResponse<SuccessResponse<Car[]>> | NextResponse<ErrorResponse>
> {
	try {
		const { data, error } = await s.from('postgres_table_cars').select('*');

		if (error) {
			return NextResponse.json<ErrorResponse>(
				{ error: error.message },
				{ status: 500 },
			);
		}

		return NextResponse.json<SuccessResponse<Car[]>>(
			{ success: true, data },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json<ErrorResponse>(
			{ error: error.message },
			{ status: 500 },
		);
	}
}
