'use client';

import { COLORS } from '@/constants/Colors';
import styled, { css } from 'styled-components';

interface TypographyProps {
	children: React.ReactNode;
	variant?: 'TITLE' | 'SUBTITLE' | 'TEXT' | 'SMALL';
	color?:
		| 'ACCENT'
		| 'SECONDARY'
		| 'TEXT'
		| 'BLACK'
		| 'BACKGROUND'
		| 'DIVIDERS'
		| 'DARKYELLOW'
		| 'RED';
	weight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
	className?: string;
	onClick?: () => void;
	ref?: React.Ref<HTMLDivElement>;
}

const variantStyles = {
	TITLE: css`
		font-size: 48px;
	`,
	SUBTITLE: css`
		font-size: 24px;
	`,
	TEXT: css`
		font-size: 16px;
	`,
	SMALL: css`
		font-size: 12px;
	`,
};

const Text = styled.div<{
	variant?: TypographyProps['variant'];
	color?: TypographyProps['color'];
	weight?: TypographyProps['weight'];
}>`
	font-family: 'Oswald', sans-serif;
	margin: 0;

	${({ variant }) => variant && variantStyles[variant]};
	${({ color }) => color && `color: ${COLORS[color]};`}
	${({ weight }) => weight && `font-weight: ${weight};`}
`;

export default function Typography({
	children,
	variant = 'TEXT',
	color = 'SECONDARY',
	weight = 'normal',
	className,
	onClick,
	ref,
}: TypographyProps) {
	return (
		<Text
			variant={variant}
			color={color}
			weight={weight}
			className={className}
			onClick={onClick}
			ref={ref}>
			{children}
		</Text>
	);
}
