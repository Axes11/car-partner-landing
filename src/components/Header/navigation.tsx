'use client';

import styled from 'styled-components';

import Typography from '@/shared/ui/Typography';
import { useLanguage } from '@/hooks/useLanguage';
import { COLORS } from '@/constants/Colors';

const NavigationContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
`;

const StyledTypography = styled(Typography)<{ hoverColor?: string }>`
	cursor: pointer;
	transition: color 0.3s;
	&:hover {
		color: ${({ hoverColor }) => hoverColor || COLORS.ACCENT};
	}
`;

export default function Navigation() {
	const languageData = useLanguage('navigation');

	return (
		<NavigationContainer>
			{languageData?.res &&
				Object.entries(languageData.res).map(([key, value]) => (
					<StyledTypography
						variant='TEXT'
						color='SECONDARY'
						weight='normal'
						key={key}
						hoverColor={COLORS.ACCENT}>
						{String(value)}
					</StyledTypography>
				))}
		</NavigationContainer>
	);
}
