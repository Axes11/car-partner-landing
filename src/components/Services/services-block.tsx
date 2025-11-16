import { useLanguage } from '@/hooks/useLanguage';
import Container from '@/shared/ui/Container';
import Title from '@/shared/ui/Title';
import ServicesCard from './service-card';
import styled from 'styled-components';

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

	return (
		<Container id='services'>
			<Title>{languageData?.res.title}</Title>
			<CardBlock>
				{languageData?.res.services.map(
					({ title, description }: Service, index: number) => {
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
