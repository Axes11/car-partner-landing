'use client';

import styled from 'styled-components';

import { COLORS } from '@/constants/Colors';

import Logo from '@/shared/ui/Logo';
import Navigation from './navigation';
import Toggler from '@/shared/ui/Toggler';

const HeaderContainer = styled.header`
	position: fixed;
	left: 0;
	width: 100%;
	display: flex;
	justify-content: center;
	z-index: 10;
	padding: 16px 0;
	background: ${COLORS.BACKGROUND};
`;

const InnerContainer = styled.div`
	width: 100%;
	max-width: 1400px;
	padding: 0 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export default function Header() {
	return (
		<HeaderContainer>
			<InnerContainer>
				<Logo />
				<Navigation />
				<Toggler />
			</InnerContainer>
		</HeaderContainer>
	);
}
