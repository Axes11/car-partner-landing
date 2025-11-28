'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';

import Title from '@/shared/ui/Title';
import Container from '@/shared/ui/Container';
import { COLORS } from '@/constants/Colors';
import CarCard from '@/components/Slider/card';
import ReviewCard from '@/components/Reviews/review-card';
import { useLanguage } from '@/hooks/useLanguage';
import { CarFromLocale, SliderProps } from './slider.interface';
import Button from '@/shared/ui/Button';
import Centered from '@/shared/ui/Centered';
import { useModalContext } from '@/shared/context/modalContext';
import getReviews from '@/shared/utils/reviews';
import { Car, ReviewsResponse } from '@/app/api/types';
import getCars from '@/shared/utils/cars';

const PageWrapper = styled.div`
	overflow-x: hidden;
`;

const SliderWrapper = styled.div`
	width: 100%;
	margin: 0 auto;
	padding: 40px 0 60px;

	.swiper {
		overflow: hidden;
	}

	.swiper-slide {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		overflow: hidden !important;
	}

	.swiper-pagination-bullet {
		background-color: ${COLORS.DIVIDERS};
		opacity: 0.8;
		transition: all 0.3s ease;
	}

	.swiper-pagination-bullet-active {
		background-color: ${COLORS.DIVIDERSACT};
		transform: scale(1.5);
		opacity: 1;
	}

	.swiper-pagination {
		margin-top: 20px;
		position: relative;
	}
`;

const CarSlider: React.FC<SliderProps> = ({ title, variant }) => {
	const [reviews, setReviews] = useState<ReviewsResponse[]>([]);
	const [carsCards, setCarsCards] = useState<Car[]>([]);

	const languageData = useLanguage(
		variant === 'cars' ? 'carSlider' : 'reviews',
	);
	const buttonsLanguageData = useLanguage('buttons');
	const dataTitle = languageData?.res?.title || '';

	useEffect(() => {
		getReviews().then((data) => {
			setReviews(data);
		});
	}, []);

	useEffect(() => {
		getCars().then((data) => {
			setCarsCards(data);
		});
	}, []);

	const ctx = useModalContext();

	return (
		<Container id={variant === 'cars' ? 'cars' : 'reviews'}>
			<PageWrapper>
				<Title>{title || dataTitle}</Title>

				<SliderWrapper>
					<Swiper
						modules={[Navigation, Pagination, Mousewheel]}
						spaceBetween={30}
						slidesPerView={3}
						pagination={{ clickable: true }}
						mousewheel={{ forceToAxis: true }}
						breakpoints={{
							0: { slidesPerView: 1, spaceBetween: 10 },
							768: { slidesPerView: 2, spaceBetween: 20 },
							1200: { slidesPerView: 3, spaceBetween: 30 },
						}}>
						{variant === 'cars' &&
							carsCards.map((car, index) => (
								<SwiperSlide key={index}>
									<CarCard {...car} />
								</SwiperSlide>
							))}

						{variant === 'reviews' &&
							reviews.map((review: ReviewsResponse, index: number) => (
								<SwiperSlide key={index}>
									<ReviewCard {...review} />
								</SwiperSlide>
							))}
					</Swiper>
				</SliderWrapper>
				<Centered>
					<Button
						onClick={() =>
							variant === 'cars'
								? ctx?.setIsRequestModalOpen(true)
								: ctx?.setIsReviewModalOpen(true)
						}>
						{variant === 'cars'
							? buttonsLanguageData?.res.consultation
							: buttonsLanguageData?.res.leaveReview}
					</Button>
				</Centered>
			</PageWrapper>
		</Container>
	);
};

export default CarSlider;
