'use client';
import { createContext, useEffect, useState } from 'react';
import Loading from '../ui/Loading';

export interface LoadingContextType {
	isLoading: boolean;
	setIsLoading: (loading: boolean) => void;
	registerImage: () => void;
	imageLoaded: () => void;
}

export const LoadingContext = createContext<LoadingContextType | null>(null);

export const LoadingProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [totalImages, setTotalImages] = useState(0);
	const [loadedImages, setLoadedImages] = useState(0);
	const [minTimePassed, setMinTimePassed] = useState(false);

	const registerImage = () => setTotalImages((prev) => prev + 1);
	const imageLoaded = () => setLoadedImages((prev) => prev + 1);

	useEffect(() => {
		const timer = setTimeout(() => setMinTimePassed(true), 2000);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (loadedImages >= totalImages && minTimePassed) {
			setIsLoading(false);
		}
	}, [loadedImages, totalImages, minTimePassed]);

	return (
		<LoadingContext.Provider
			value={{ isLoading, setIsLoading, registerImage, imageLoaded }}>
			{children}
		</LoadingContext.Provider>
	);
};
