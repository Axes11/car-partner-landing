'use client';

import styled from 'styled-components';

import Header from '@/components/Header/header';
import WelcomeBlock from '@/components/Welcome/welcome-block';
import AboutUsBlock from '@/components/AboutUs/about-us-block';
import HowItWorksBlock from '@/components/HowItWorks/how-it-works-block';

const Body = styled.div`
	width: 100%;
	height: 100%;
	margin: 0 auto;
	z-index: -2;
`;

export default function Home() {
	return (
		<Body>
			<Header />
			<WelcomeBlock />
			<AboutUsBlock />
			<HowItWorksBlock />
		</Body>
	);
}
