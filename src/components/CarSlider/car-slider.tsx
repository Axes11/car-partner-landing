import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";

import Title from "@/shared/ui/Title";
import CarCard from "./car-card";
import Container from "@/shared/ui/Container";
import { COLORS } from "@/constants/Colors";
import { useLanguage } from "@/hooks/useLanguage";

interface Car {
  cardTitle: string;
  color: string;
  engine: string;
  type: string;
  cardKey: string;
  price: string;
}

const PageWrapper = styled.div`
  overflow-x: hidden;
`;

const SliderWrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;

  padding-bottom: 60px;
  padding-top: 40px;

  .swiper {
    overflow: hidden;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow: visible !important;
  }

  .swiper-wrapper {
    align-items: stretch;
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

export default function CarsPage() {
  const languageData = useLanguage("carSlider");

  const cars: Car[] = languageData?.res?.cars || [];

  return (
    <Container>
      <PageWrapper>
        <Title>{languageData?.res?.title}</Title>

        <SliderWrapper>
          <Swiper
            modules={[Navigation, Pagination, Mousewheel]}
            spaceBetween={30}
            slidesPerView={3}
            pagination={{ clickable: true }}
            mousewheel={{ forceToAxis: true }}
            style={{ paddingBottom: "40px" }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 10 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1200: { slidesPerView: 3, spaceBetween: 30 },
            }}
          >
            {cars.map((car: Car, index: number) => (
              <SwiperSlide key={index}>
                <CarCard
                  image="car1.png"
                  title={car.cardTitle}
                  color={car.color}
                  engine={car.engine}
                  type={car.type}
                  cardKey={car.cardKey}
                  price={car.price}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </SliderWrapper>
      </PageWrapper>
    </Container>
  );
}
