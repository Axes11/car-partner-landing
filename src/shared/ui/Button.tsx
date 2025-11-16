'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';
import Typography from './Typography';
import { COLORS } from '@/constants/Colors';

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	disabled: boolean;
}

const StyledButton = styled.button`
	position: relative;
	overflow: hidden;
	box-shadow: inset 0 0 0 2px ${COLORS.ACCENT};
	border-radius: 100px;
	padding: 10px 20px;
	background: transparent;
	cursor: pointer;

	&:disabled {
		opacity: 0.5;
	}
`;

const Ripple = styled.div`
	position: absolute;
	width: 10px;
	height: 10px;
	background: ${COLORS.ACCENT};
	border-radius: 100px;
	pointer-events: none;
	transform: scale(0);
	opacity: 1;
`;

const StyledTypography = styled(Typography)`
	position: relative;
	z-index: 1;
`;

export default function Button({ children, onClick, disabled }: ButtonProps) {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const rippleRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);

	const animationRef = useRef<gsap.core.Tween | null>(null);

	const handleMouseEnter = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		if (disabled) return;

		if (rippleRef.current && buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			animationRef.current?.kill();

			gsap.set(rippleRef.current, { left: x, top: y, scale: 0, opacity: 1 });
			animationRef.current = gsap.to(rippleRef.current, {
				scale: 40,
				opacity: 1,
				duration: 0.5,
				ease: 'power2.out',
			});

			gsap.to(textRef.current, {
				color: COLORS.BLACK,
				duration: 0.5,
				ease: 'power2.out',
			});
		}
	};

	const handleMouseLeave = () => {
		if (!rippleRef.current) return;

		animationRef.current?.kill();

		animationRef.current = gsap.to(rippleRef.current, {
			scale: 0,
			duration: 0.6,
			ease: 'power2.in',
			onComplete: () => {
				gsap.to(textRef.current, {
					color: COLORS.TEXT,
					duration: 0.3,
				});
			},
		});
	};

	return (
		<StyledButton
			ref={buttonRef}
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			disabled={disabled}>
			<Ripple ref={rippleRef} />
			<StyledTypography
				ref={textRef}
				variant='TEXT'
				color='TEXT'
				weight='normal'>
				{children}
			</StyledTypography>
		</StyledButton>
	);
}
