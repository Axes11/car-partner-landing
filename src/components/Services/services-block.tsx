import { useLanguage } from '@/hooks/useLanguage';
import Container from '@/shared/ui/Container';
import Title from '@/shared/ui/Title';
import ServicesCard from './service-card';
import styled from 'styled-components';
import { useEffect } from 'react';

interface Service {
	title: string;
	description: string;
}

const CardBlock = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 16px;
`;

export default function ServicesBlock() {
	const languageData = useLanguage('serviceBlock');

	useEffect(() => {
		console.log(languageData);
	}, [languageData]);

	return (
		<Container id='services'>
			<Title>{languageData?.res.title}</Title>
			<CardBlock>
				{languageData?.res.services.map(
					({ title, description }: Service, index: number) => {
						console.log(title, description);
						return (
							<ServicesCard
								key={index}
								title={title}
								description={description}
							/>
						);
					},
				)}
			</CardBlock>
		</Container>
	);
}
