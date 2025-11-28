export interface IReq {
	name: string;
	review: string;
	file: File;
}

export interface ErrorResponse {
	error: string;
}

export interface SuccessResponseArr<T> {
	success: boolean;
	data?: T[];
}

export interface SuccessResponse<T> {
	success: boolean;
	data?: T;
}

export interface ReviewsResponse {
	id: number;
	created_at: string;
	name: string;
	review: string;
	image_url: string;
}

export interface Car {
	id: number;
	name: string;
	color: string;
	volume: string;
	type: string;
	price: number;
	img: string;
}
