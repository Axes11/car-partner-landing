'use client';

import styled from 'styled-components';

import Typography from '@/shared/ui/Typography';
import { useLanguage } from '@/hooks/useLanguage';
import { COLORS } from '@/constants/Colors';
import { useEffect, useState } from 'react';

interface NavigationItem {
	label: string;
	href: string;
}

const NavigationContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const StyledTypography = styled(Typography)<{ hoverColor?: string }>`
	cursor: pointer;
	transition: color 0.3s;
	&:hover {
		color: ${({ hoverColor }) => hoverColor || COLORS.ACCENT};
	}

	@media (max-width: 768px) {
		font-size: 16px;
		align-items: flex-start;
	}
`;

export default function Navigation({ onClose }: { onClose?: () => void }) {
	const [activeElement, setActiveElement] = useState<string>('');

	useEffect(() => {
		if (window) {
			setActiveElement(window.location.hash);
		}
	}, []);

	const languageData = useLanguage('navigation') as {
		ln: string;
		res: NavigationItem[];
	};

	const scrollToSection = (href: string): void => {
		const element = document.getElementById(href);
		const headerOffset = 80;
		let offsetPosition = 0;
		if (element) {
			const elementPosition =
				element.getBoundingClientRect().top + window.pageYOffset;
			offsetPosition = elementPosition - headerOffset;
		}
		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth',
		});

		if (onClose) {
			onClose();
		}
		setActiveElement(href);
	};

	return (
		<NavigationContainer>
			{languageData?.res &&
				languageData.res.map((el) => (
					<div
						key={`navigation-${el.href}`}
						onClick={() => scrollToSection(el.href)}>
						<StyledTypography
							variant='TEXT'
							color={activeElement === el.href ? 'ACCENT' : 'SECONDARY'}
							weight='normal'
							key={el.href}
							hoverColor={COLORS.ACCENT}>
							{String(el.label)}
						</StyledTypography>
					</div>
				))}
		</NavigationContainer>
	);
}
