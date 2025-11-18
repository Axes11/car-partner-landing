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

const ImageContainer = styled.div`
	position: absolute;
	width: 620px;
	left: 80px;
	top: -200px;
`;

const PinWrapper = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 100px 150px;
	margin-top: 100px;
	margin-bottom: 80px;
`;

export default function HowItWorksBlock() {
	const [cardsData, setCardsData] = useState<Item[]>([]);
	const languageData = useLanguage('howItWorksBlock');
	const buttonLanguageData = useLanguage('buttons');

	const ctx = useModalContext();

	const pathRef = useRef<SVGPathElement | null>(null);
	const rectRef = useRef<SVGPathElement | null>(null);
	const blockRef = useRef<HTMLDivElement | null>(null);
	const pinWrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (languageData?.res?.blocks) {
			setCardsData(languageData.res.blocks);
		}
	}, [languageData?.res?.blocks]);

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
		gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

		if (pathRef.current && rectRef.current && blockRef.current) {
			const anim = gsap.to(rectRef.current, {
				scrollTrigger: {
					trigger: blockRef.current,
					start: 'top top',
					end: () =>
						`+=${blockRef.current ? blockRef.current.offsetHeight : 0}`,
					scrub: 5,
					pin: true,
					pinSpacing: true,
				},
				ease: 'power1.inOut',
				motionPath: {
					path: pathRef.current,
					align: pathRef.current,
					autoRotate: true,
					alignOrigin: [0.5, 0.5],
				},
			});

			setTimeout(() => {
				window.dispatchEvent(new Event('resize'));
			}, 500);

			return () => {
				anim.scrollTrigger?.kill();
				anim.kill();
			};
		}
	}, []);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		if (pinWrapperRef.current) {
			gsap.to(pinWrapperRef.current, {
				y: -100,
				ease: 'none',
				scrollTrigger: {
					trigger: pinWrapperRef.current,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true,
				},
			});
		}
	}, []);

	let c = 0;

	return (
		<div ref={blockRef}>
			<Container id={'how-it-works'}>
				<Title>{languageData?.res?.title}</Title>

				<div id='wrapper'>
					<PinWrapper ref={pinWrapperRef}>
						<ImageContainer className='pin'>
							<svg
								width='1200'
								height='900'
								viewBox='0 0 812 1213'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									id='path'
									ref={pathRef}
									d='M46.2249 274.334C140.738 198.779 759.063 193.562 790.813 302.854C864.216 555.536 427.154 460.968 155.61 503.999C62.4084 518.768 29.913 528.516 29.913 623.084C29.913 932.807 463.207 788.337 688.253 825.5C745.824 835.006 786.015 840.741 797.049 985.345C808.084 1129.95 181.997 1169.98 16 1200'
									stroke='#545454'
									strokeWidth='2'
									strokeLinecap='round'
									strokeDasharray='24 24'
								/>
								<circle
									className='circle'
									cx='411.5'
									cy='218.5'
									r='13.5'
									fill='#CE9A1B'
								/>
								<path
									className='circle'
									d='M58 270.5C58 277.955 51.9558 284 44.5 284C37.0442 284 31 277.955 31 270.5C31 263.044 37.0442 257 44.5 257C51.9558 257 58 263.044 58 270.5Z'
									fill='#CE9A1B'
								/>
								<circle
									className='circle'
									cx='798.5'
									cy='320.5'
									r='13.5'
									fill='#CE9A1B'
								/>
								<circle
									className='circle'
									cx='405.5'
									cy='490.5'
									r='13.5'
									fill='#CE9A1B'
								/>
								<path
									className='circle'
									d='M799 905.5C799 912.955 792.956 919 785.5 919C778.044 919 772 912.955 772 905.5C772 898.044 778.044 892 785.5 892C792.956 892 799 898.044 799 905.5Z'
									fill='#CE9A1B'
								/>
								<path
									className='circle'
									d='M425 824.5C425 831.955 418.956 838 411.5 838C404.044 838 398 831.955 398 824.5C398 817.044 404.044 811 411.5 811C418.956 811 425 817.044 425 824.5Z'
									fill='#CE9A1B'
								/>
								<path
									className='circle'
									d='M48 590.5C48 597.955 41.9558 604 34.5 604C27.0442 604 21 597.955 21 590.5C21 583.044 27.0442 577 34.5 577C41.9558 577 48 583.044 48 590.5Z'
									fill='#CE9A1B'
								/>
								<circle cx='13.5' cy='1199.5' r='13.5' fill='#CE9A1B' />
								<path
									className='circle'
									d='M9 1163.5V1183H11.3232H13.6465V1174.2V1165.4H16.3125H18.9785V1168.07V1170.74H21.6445H24.3105V1168.07V1165.4H26.9766H29.6426V1168.07V1170.74H32.3086H34.9746V1168.07V1165.4H32.3086H29.6426V1162.7V1160H32.3086H34.9746V1157.33V1154.66H37.6787H40.3828V1157.33V1160H43.0488H45.7148L45.6996 1157.34L45.6768 1154.7L43.0336 1154.68L40.3828 1154.66V1152V1149.33H43.0488H45.7148V1146.67V1144H43.0488H40.3828V1146.67V1149.33H37.6787H34.9746V1146.67V1144H32.3086H29.6426V1146.67V1149.33H26.9766H24.3105V1146.67V1144H21.6445H18.9785V1146.67V1149.33H16.3125H13.6465V1146.67V1144H11.3232H9V1163.5ZM24.3105 1152V1154.66H26.9766H29.6426V1152V1149.33H32.3086H34.9746V1152V1154.66H32.3086H29.6426V1157.33V1160H26.9766H24.3105V1162.7V1165.4H21.6445H18.9785V1162.7V1160H16.3125H13.6465V1157.33V1154.66H16.3125H18.9785V1152V1149.33H21.6445H24.3105V1152Z'
									fill='#CE9A1B'
								/>
								<path
									d='M18.9785 1157.33V1160H21.6445H24.3105V1157.33V1154.66H21.6445H18.9785V1157.33Z'
									fill='#CE9A1B'
								/>
								<path
									className='circle'
									d='M35.0128 1160.09C34.9899 1160.14 34.9823 1161.35 34.9899 1162.78L35.0128 1165.37H37.6788H40.3448V1162.7V1160.03L37.694 1160.01C35.6069 1160 35.0356 1160.01 35.0128 1160.09Z'
									fill='#CE9A1B'
								/>
								<path
									className='circle'
									d='M40.3828 1168.07V1170.74H43.0488H45.7148V1168.07V1165.4H43.0488H40.3828V1168.07Z'
									fill='#CE9A1B'
								/>
								<path
									id='rect'
									ref={rectRef}
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
										isActive={true}
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
									isActive={true}
								/>
							);
						})}
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
