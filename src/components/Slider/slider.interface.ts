export interface Car {
	image: string;
	title: string;
	color: string;
	engine: string;
	type: string;
	cardKey: string;
	price: string;
}

export interface CarFromLocale {
	cardTitle: string;
	color: string;
	engine: string;
	type: string;
	cardKey: string;
	price: string;
	image: string;
}

export interface Review {
	image: string;
	nickname: string;
	review: string;
}

export interface SliderProps {
	title?: string;
	variant: 'cars' | 'reviews';
}
