'use client';

import styled from 'styled-components';

import Header from '@/components/Header/header';
import WelcomeBlock from '@/components/Welcome/welcome-block';
import AboutUsBlock from '@/components/AboutUs/about-us-block';
import HowItWorksBlock from '@/components/HowItWorks/how-it-works-block';
import Footer from '@/components/Footer/footer-block';
import Slider from '@/components/Slider/slider';
import ServiceBlock from '@/components/Services/services-block';

const Body = styled.div`
	width: 100%;
	height: 100%;
	margin: 0 auto;
	z-index: -2;

	display: flex;
	flex-direction: column;
`;

const Wrapper = styled.div`
	flex: 1 auto;
`;

export default function Home() {
	return (
		<Body>
			<Header />
			<Wrapper>
				<WelcomeBlock />
				<AboutUsBlock />
				<HowItWorksBlock />
				<Slider variant='cars' />
				<ServiceBlock />
				<Slider variant='reviews' />
			</Wrapper>
			<Footer />
		</Body>
	);
}
