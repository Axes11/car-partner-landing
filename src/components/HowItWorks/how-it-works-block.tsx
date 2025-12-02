'use client';

import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';

import { useLanguage } from '@/hooks/useLanguage';

import Container from '@/shared/ui/Container';
import Title from '@/shared/ui/Title';
import Card from './card';

import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/shared/ui/Button';
import Centered from '@/shared/ui/Centered';
import { useModalContext } from '@/shared/context/modalContext';

interface Item {
	title: string;
	description: string;
}

const ImageContainer = styled.div<{ mobile?: boolean }>`
	position: absolute;
	width: ${({ mobile }) => (mobile ? '0px' : '620px')};
	left: ${({ mobile }) => (mobile ? '80%' : '80px')};
	top: ${({ mobile }) => (mobile ? '24px' : '-200px')};

	@media (max-width: 768px) {
		left: 80%;
		top: 24px;
	}
`;

const PinWrapper = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 100px 150px;
	margin-top: 100px;
	margin-bottom: 80px;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		gap: 50px 0;
	}
`;

export default function HowItWorksBlock() {
	const [cardsData, setCardsData] = useState<Item[]>([]);
	const languageData = useLanguage('howItWorksBlock');
	const buttonLanguageData = useLanguage('buttons');
	const ctx = useModalContext();

	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (languageData?.res?.blocks) {
			setCardsData(languageData.res.blocks);
		}
	}, [languageData?.res?.blocks]);

	const pathRefMobile = useRef<SVGPathElement | null>(null);
	const rectRefMobile = useRef<SVGPathElement | null>(null);
	const pathRefDesktop = useRef<SVGPathElement | null>(null);
	const rectRefDesktop = useRef<SVGPathElement | null>(null);
	const blockRef = useRef<HTMLDivElement | null>(null);
	const pinWrapperRef = useRef<HTMLDivElement>(null);

	const getTextAlign = (i: number) => {
		switch (i % 3) {
			case 0:
				return 'right';
			case 1:
				return 'center';
			case 2:
				return 'left';
		}
	};

	useEffect(() => {
		if (typeof window === 'undefined') return;

		gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

		const pathRefCurrent = isMobile
			? pathRefMobile.current
			: pathRefDesktop.current;
		const rectRefCurrent = isMobile
			? rectRefMobile.current
			: rectRefDesktop.current;

		if (pathRefCurrent && rectRefCurrent && blockRef.current) {
			const anim = gsap.to(rectRefCurrent, {
				scrollTrigger: {
					trigger: blockRef.current,
					start: 'top top',
					end: 'bottom center',
					scrub: 3,
				},
				ease: 'power1.out',
				motionPath: {
					path: pathRefCurrent,
					align: pathRefCurrent,
					autoRotate: true,
					alignOrigin: [0.5, 0.5],
				},
			});

			return () => {
				anim.scrollTrigger?.kill();
				anim.kill();
			};
		}
	}, [isMobile]);

	let c = 0;

	return (
		<div ref={blockRef}>
			<Container id='how-it-works'>
				<Title>{languageData?.res?.title}</Title>

				<div id='wrapper'>
					<PinWrapper ref={pinWrapperRef}>
						{isMobile ? (
							<>
								<ImageContainer mobile className='pin'>
									<svg
										width='29'
										height='1100'
										viewBox='0 -30 29 1150'
										fill='none'>
										<path
											ref={pathRefMobile}
											d='M15.5 0 L15.5 1090'
											stroke='white'
											strokeDasharray='24 24'
										/>

										<path
											ref={rectRefMobile}
											d='M72.2725 275.231L72.2725 262.912C72.2725 259.646 68.6403 257 65.3748 257L28.9128 257C25.6483 257 22.9999 259.646 22.9999 262.912L22.9999 275.231C22.9999 278.495 25.6473 281.144 28.9128 281.144L65.3748 281.144C68.6403 281.142 72.2725 278.495 72.2725 275.231ZM57.4086 280.108L45.1879 280.108L44.8201 277.249L49.8551 277.249L57.4086 280.108ZM60.9862 278.608C56.9005 277.543 52.0708 276.283 52.0708 276.283L52.0708 261.859L60.9862 259.531C60.9862 259.531 64.148 268.838 60.9862 278.608ZM49.5251 260.927L44.8191 260.927L45.1847 258.066L57.0796 258.066L49.5251 260.927ZM32.5271 258.066L43.3796 258.066L43.0203 260.927L34.4338 260.927L32.5271 258.066ZM29.4429 259.698L32.9378 262.021L32.9378 276.448L29.4429 278.773L29.4429 259.698ZM34.7618 277.249L43.0088 277.249L43.3807 280.108L32.854 280.108L34.7618 277.249Z'
											fill='white'
										/>
									</svg>
								</ImageContainer>

								{cardsData.map((item, i) => (
									<Card
										key={i}
										align='left'
										title={item?.title || ''}
										description={item?.description || ''}
										isActive
									/>
								))}
							</>
						) : (
							<>
								<ImageContainer className='pin'>
									<svg
										width='1200'
										height='900'
										viewBox='0 0 812 1250'
										fill='none'>
										<path
											ref={pathRefDesktop}
											d='M46.2249 274.334C140.738 198.779 759.063 193.562 790.813 302.854C864.216 555.536 427.154 460.968 155.61 503.999C62.4084 518.768 29.913 528.516 29.913 623.084C29.913 932.807 463.207 788.337 688.253 825.5C745.824 835.006 786.015 840.741 797.049 985.345C808.084 1129.95 181.997 1169.98 16 1200'
											stroke='#545454'
											strokeWidth='2'
											strokeLinecap='round'
											strokeDasharray='24 24'
										/>
										<path
											ref={rectRefDesktop}
											d='M72.2725 275.231L72.2725 262.912C72.2725 259.646 68.6403 257 65.3748 257L28.9128 257C25.6483 257 22.9999 259.646 22.9999 262.912L22.9999 275.231C22.9999 278.495 25.6473 281.144 28.9128 281.144L65.3748 281.144C68.6403 281.142 72.2725 278.495 72.2725 275.231ZM57.4086 280.108L45.1879 280.108L44.8201 277.249L49.8551 277.249L57.4086 280.108ZM60.9862 278.608C56.9005 277.543 52.0708 276.283 52.0708 276.283L52.0708 261.859L60.9862 259.531C60.9862 259.531 64.148 268.838 60.9862 278.608ZM49.5251 260.927L44.8191 260.927L45.1847 258.066L57.0796 258.066L49.5251 260.927ZM32.5271 258.066L43.3796 258.066L43.0203 260.927L34.4338 260.927L32.5271 258.066ZM29.4429 259.698L32.9378 262.021L32.9378 276.448L29.4429 278.773L29.4429 259.698ZM34.7618 277.249L43.0088 277.249L43.3807 280.108L32.854 280.108L34.7618 277.249Z'
											fill='white'
										/>
									</svg>
								</ImageContainer>

								{Array.from({ length: 12 }, (_, i) => {
									if ([5, 6, 10, 11].includes(i)) {
										c++;
										return (
											<Card
												key={i}
												align={getTextAlign(i)}
												title=''
												description=''
												isActive
											/>
										);
									}
									const item = cardsData[i - c];
									return (
										<Card
											key={i}
											align={getTextAlign(i)}
											title={item?.title || ''}
											description={item?.description || ''}
											isActive
										/>
									);
								})}
							</>
						)}
					</PinWrapper>

					<Centered>
						<Button onClick={() => ctx?.setIsRequestModalOpen(true)}>
							{buttonLanguageData?.res.consultation}
						</Button>
					</Centered>
				</div>
			</Container>
		</div>
	);
}
