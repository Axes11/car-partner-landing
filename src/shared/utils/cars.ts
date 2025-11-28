import { Car } from '@/app/api/types';
import axios, { AxiosResponse } from 'axios';

export default async function getCars() {
	try {
		const response = await axios.get<AxiosResponse<Car[]>>('/api/cars');
		return response.data.data;
	} catch (error) {
		throw error;
	}
}
