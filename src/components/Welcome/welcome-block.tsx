'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

import { useLanguage } from '@/hooks/useLanguage';

import Button from '@/shared/ui/Button';
import Container from '@/shared/ui/Container';
import Typography from '@/shared/ui/Typography';
import Image from 'next/image';
import AdvantagesBlock from '../Advantages/advantages-block';

import upperImg from '@/assets/imgs/upper.png';
import bottomImg from '@/assets/imgs/bottom.png';
import { useLoadingContext } from '@/shared/context/loadingContext';
import { useModalContext } from '@/shared/context/modalContext';

const WelcomeBlockContainer = styled(Container)`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: flex-end;
	height: 100%;
	min-height: 100vh;
	gap: 100px;
	padding: 100px 16px;
`;

const WelcomeWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const UpperContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const StyledContainer = styled.div`
	width: 30%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	box-sizing: border-box;
`;

const TitleContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 12px;
`;

const ImageContainerBottom = styled.div`
	position: relative;
	width: 100%;
	height: 280px;
	overflow: hidden;
`;

const ImageContainerUpper = styled.div`
	width: 65%;
	height: 280px;
	overflow: hidden;
`;

const StyledTypography = styled(Typography)`
	margin-bottom: 20px;
	margin-top: 10px;
`;

export default function WelcomeBlock() {
	const languageData = useLanguage('welcomeBlock');

	const modalContext = useModalContext();
	const ctx = useLoadingContext();

	const upperImgRef = useRef<HTMLImageElement>(null);
	const bottomImgRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			[upperImgRef, bottomImgRef].forEach((ref) => {
				if (!ref.current) return;

				const rect = ref.current.getBoundingClientRect();
				const xPercent = ((e.clientX - rect.left) / rect.width) * 25;
				const yPercent = ((e.clientY - rect.top) / rect.height) * 25;

				gsap.to(ref.current, {
					scale: 1.02,
					transformOrigin: `${xPercent}% ${yPercent}%`,
					duration: 0.5,
					ease: 'power2.out',
					overwrite: 'auto',
				});
			});
		};

		const handleMouseLeave = () => {
			[upperImgRef, bottomImgRef].forEach((ref) => {
				if (!ref.current) return;
				gsap.to(ref.current, {
					scale: 1,
					transformOrigin: '50% 50%',
					duration: 0.8,
					ease: 'power2.out',
					overwrite: 'auto',
				});
			});
		};

		document.body.addEventListener('mousemove', handleMouseMove);
		document.body.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			document.body.removeEventListener('mousemove', handleMouseMove);
			document.body.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, []);

	return (
		<WelcomeBlockContainer id={'welcome'}>
			<WelcomeWrapper>
				<UpperContainer>
					<StyledContainer>
						<TitleContainer>
							<Typography variant='TITLE' color='SECONDARY' weight='bold'>
								{languageData?.res?.title}
							</Typography>
							<Typography variant='TITLE' color='ACCENT' weight='bold'>
								{languageData?.res?.highlightedTitle}
							</Typography>
						</TitleContainer>
						<StyledTypography variant='TEXT' color='TEXT' weight='normal'>
							{languageData?.res?.subtitle}
						</StyledTypography>
						<Button
							onClick={() => {
								modalContext?.setIsRequestModalOpen(true);
							}}>
							{languageData?.res?.button}
						</Button>
					</StyledContainer>
					<ImageContainerUpper>
						<Image
							ref={upperImgRef}
							src={upperImg}
							style={{ objectFit: 'cover' }}
							onLoad={() => ctx?.imageLoaded}
							onError={() => ctx?.imageLoaded}
							alt='1'
						/>
					</ImageContainerUpper>
				</UpperContainer>
				<ImageContainerBottom>
					<Image
						ref={bottomImgRef}
						src={bottomImg}
						style={{ objectFit: 'cover' }}
						onLoad={() => ctx?.imageLoaded}
						onError={() => ctx?.imageLoaded}
						alt='1'
					/>
				</ImageContainerBottom>
			</WelcomeWrapper>
			<AdvantagesBlock />
		</WelcomeBlockContainer>
	);
}
