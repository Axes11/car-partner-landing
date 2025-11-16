'use client';

import styled from 'styled-components';
import LogoIcon from '@/assets/icons/Logo';
import Typography from './Typography';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useEffect } from 'react';

const LogoContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
`;

const TextBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 10px;
`;

const StyledTypography = styled(Typography)`
	margin-top: -8px;
`;

export default function Logo() {
	gsap.registerPlugin(SplitText);

	useEffect(() => {
		if (document.fonts) {
			gsap.registerPlugin(SplitText);
			document.fonts.ready.then(() => {
				const split = SplitText.create('.animate-me', {
					type: 'words',
					aria: 'hidden',
				});

				gsap.fromTo(
					split.words,
					{
						opacity: 0,
					},
					{
						opacity: 1,
						duration: 1,
						ease: 'sine.out',
						stagger: 0.1,
					},
				);
			});
		}
	}, []);

	return (
		<LogoContainer>
			<LogoIcon />
			<TextBlock>
				<Typography
					variant='SUBTITLE'
					color='TEXT'
					weight={'bold'}
					className='animate-me'>
					CARPARTNER
				</Typography>
				<StyledTypography
					variant='TEXT'
					color='TEXT'
					weight={'bold'}
					className='animate-me'>
					DEIN AUTO. UNSER JOB.
				</StyledTypography>
			</TextBlock>
		</LogoContainer>
	);
}
