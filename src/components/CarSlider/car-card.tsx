import Image from "next/image";
import React from "react";
import styled from "styled-components";
import CardImage from "@/assets/imgs/car1.png";
import Typography from "@/shared/ui/Typography";
import { COLORS } from "@/constants/Colors";

interface CarCardProps {
  image: string;
  title: string;
  color: string;
  engine: string;
  type: string;
  cardKey: string;
  price: string;
}

const CarCardContainer = styled.div`
  max-width: 390px;
  max-height: 391px;
  background: black;
  color: ${COLORS.BLACK};
  overflow: hidden;
  box-shadow: 0 4px 10px ${COLORS.BLACK};
`;
const CarImageContainer = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CarInfo = styled.div`
  background: ${COLORS.ACCENT};
  padding: 12px;
  border-top: 8px solid ${COLORS.BLACK};
`;

const CarDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  font-size: 0.875rem;
  margin-top: 4px;
`;

const CarSpecs = styled.div`
  display: flex;
  gap: 8px;
`;

const CarPrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: 5px;
`;
console.log(CarImage);
export default function CarCard({
  image,
  title,
  color,
  engine,
  type,
  cardKey,
  price,
}: CarCardProps) {
  return (
    <CarCardContainer>
      <CarImageContainer>
        <Image src={CardImage} style={{ objectFit: "contain" }} alt={title} />
      </CarImageContainer>
      <CarInfo>
        <Typography variant="SUBTITLE" color="BLACK" weight="bold">
          {title}
        </Typography>
        <CarDetails>
          <CarSpecs>
            <Typography variant="TEXT" color="DARKYELLOW" weight="bold">
              {color}
            </Typography>
            <Typography variant="TEXT" color="DARKYELLOW" weight="bold">
              {engine}
            </Typography>
            <Typography variant="TEXT" color="DARKYELLOW" weight="bold">
              {type}
            </Typography>
          </CarSpecs>
          <CarPrice>
            <Typography variant="SMALL" color="DARKYELLOW" weight="bold">
             {cardKey}{" "} 
            </Typography>
            <Typography variant="SUBTITLE" color="BLACK" weight="bold">
              {price}$
            </Typography>
          </CarPrice>
        </CarDetails>
      </CarInfo>
    </CarCardContainer>
  );
}
