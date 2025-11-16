import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import CardImage from '@/assets/imgs/car1.png';
import Typography from '@/shared/ui/Typography';
import { COLORS } from '@/constants/Colors';
import { useLoadingContext } from '@/shared/context/loadingContext';

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
	width: 100%;
	background: ${COLORS.BLACK};
	color: ${COLORS.BLACK};
	overflow: hidden;
	box-shadow: 0 4px 10px ${COLORS.BLACK};
`;

const CarImageContainer = styled.div`
	position: relative;
	width: 100%;
	height: 300px;
	overflow: hidden;
`;

const CarInfo = styled.div`
	background: ${COLORS.ACCENT};
	padding: 12px;
	border-top: 6px solid ${COLORS.BLACK};
`;

const CarDetails = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: ${COLORS.BLACK};
	margin-top: 8px;
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

export default function CarCard({
	image,
	title,
	color,
	engine,
	type,
	cardKey,
	price,
}: CarCardProps) {
	const ctx = useLoadingContext();

	return (
		<CarCardContainer>
			<CarImageContainer>
				<Image
					src={CardImage} // или src={image} если хочешь динамически
					alt={title}
					onLoad={() => ctx?.imageLoaded}
					onError={() => ctx?.imageLoaded}
					fill
					style={{ objectFit: 'cover' }}
				/>
			</CarImageContainer>
			<CarInfo>
				<Typography variant='SUBTITLE' color='BLACK' weight='bold'>
					{title}
				</Typography>
				<CarDetails>
					<CarSpecs>
						<Typography variant='TEXT' color='DARKYELLOW' weight='bold'>
							{color}
						</Typography>
						<Typography variant='TEXT' color='DARKYELLOW' weight='bold'>
							{engine}
						</Typography>
						<Typography variant='TEXT' color='DARKYELLOW' weight='bold'>
							{type}
						</Typography>
					</CarSpecs>
					<CarPrice>
						<Typography variant='SMALL' color='DARKYELLOW' weight='bold'>
							{cardKey}
						</Typography>
						<Typography variant='SUBTITLE' color='BLACK' weight='bold'>
							{price}$
						</Typography>
					</CarPrice>
				</CarDetails>
			</CarInfo>
		</CarCardContainer>
	);
}
