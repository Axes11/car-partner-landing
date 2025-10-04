'use client';

import { COLORS } from '@/constants/Colors';
import styled, { css, keyframes } from 'styled-components';
import { useLanguageContext } from '../context/languageContext';
import Typography from './Typography';

const bounce = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0); }
`;

const TogglerContainer = styled.div<{ background?: string }>`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 140px;
	border-radius: 100px;
	padding: 3px;
	background: ${(props) => props.background || '#2E2D2D'};
`;

const Slider = styled.div<{ position: 'ua' | 'ru' }>`
	position: absolute;
	top: 3px;
	left: ${(props) => (props.position === 'ua' ? '3px' : 'calc(50% + 3px)')};
	width: calc(50% - 6px);
	height: 34px;
	background: ${COLORS.ACCENT};
	border-radius: 100px;
	transition: left 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
	z-index: 0;
`;

const TogglerButtonContainer = styled.div`
	display: flex;
	width: 100%;
	z-index: 1;
`;

const StyledTypography = styled(Typography)<{ active?: boolean }>`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 34px;
	color: ${(props) => (props.active ? COLORS.BLACK : COLORS.TEXT)};
	cursor: pointer;
	user-select: none;
	transition: color 0.3s, transform 0.3s;

	${(props) =>
		props.active &&
		css`
			animation: ${bounce} 0.4s ease;
		`}
`;

export default function Toggler() {
	const languageContext = useLanguageContext();
	const ln = languageContext?.ln || 'ua';
	const toggleLanguage = languageContext?.toggleLanguage || (() => {});

	if (!languageContext) return null;

	return (
		<TogglerContainer background={COLORS.DIVIDERS}>
			<Slider position={ln} />
			<TogglerButtonContainer>
				<StyledTypography
					active={ln === 'ua'}
					onClick={() => toggleLanguage('ua')}>
					UA
				</StyledTypography>
				<StyledTypography
					active={ln === 'ru'}
					onClick={() => toggleLanguage('ru')}>
					RU
				</StyledTypography>
			</TogglerButtonContainer>
		</TogglerContainer>
	);
}
