'use client';

import styled from 'styled-components';

import { COLORS } from '@/constants/Colors';

import Logo from '@/shared/ui/Logo';
import Navigation from './navigation';
import Toggler from '@/shared/ui/Toggler';
import Socials from '@/shared/ui/Socials';
import Contacts from '@/shared/ui/Contacts';
import { List, X } from '@phosphor-icons/react';
import { useRef } from 'react';
import gsap from 'gsap';

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

const DesktopContainer = styled.div`
	width: 100%;
	max-width: 1400px;
	padding: 0 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 768px) {
		display: none;
	}
`;

const MobileContainer = styled.div`
	display: none;
	width: 100%;
	background-color: ${COLORS.BLACK};
	flex-direction: column;
	align-items: flex-start;
	right: 0;
	top: 0;
	position: fixed;
	height: 100vh;
	padding: 20px 20px 80px;
	border-left: 2px solid ${COLORS.ACCENT};
	gap: 20px;
	justify-content: space-between;

	@media (max-width: 768px) {
		display: flex;
		transform: translateX(100%);
	}
`;

const MobileUpper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 30px;
`;

const MobileBottom = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 30px;
`;

const MobileHeader = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const MobileButton = styled.div`
	width: 100%;
	align-items: center;
	display: none;
	justify-content: space-between;
	padding: 0 16px;

	@media (max-width: 768px) {
		display: flex;
	}
`;

export default function Header() {
	const mobileNav = useRef(null);

	const isMobileNavOpened = useRef(false);

	const handleMobileNav = () => {
		if (!mobileNav.current) return;

		if (isMobileNavOpened.current) {
			isMobileNavOpened.current = false;
			gsap.to(mobileNav.current, {
				x: '100%',
				duration: 0.5,
				ease: 'power2.out',
			});
		} else {
			isMobileNavOpened.current = true;
			gsap.to(mobileNav.current, {
				x: '0%',
				duration: 0.5,
				ease: 'power2.out',
			});
		}
	};

	return (
		<HeaderContainer>
			<DesktopContainer>
				<Logo />
				<Navigation />
				<Toggler />
			</DesktopContainer>

			<MobileButton>
				<Logo />
				<List
					size={32}
					color={COLORS.ACCENT}
					onClick={() => handleMobileNav()}
				/>
			</MobileButton>

			<MobileContainer ref={mobileNav}>
				<MobileUpper>
					<MobileHeader>
						<Logo />
						<X
							size={24}
							color={COLORS.DARKGREY}
							onClick={() => handleMobileNav()}
						/>
					</MobileHeader>
					<Navigation onClose={handleMobileNav} />
				</MobileUpper>
				<MobileBottom>
					<Toggler />
					<Contacts color={'DARKGREY'} />
					<Socials color={'ACCENT'} />
				</MobileBottom>
			</MobileContainer>
		</HeaderContainer>
	);
}
