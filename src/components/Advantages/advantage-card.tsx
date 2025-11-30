import { ReactNode } from 'react';
import styled from 'styled-components';

import Typography from '@/shared/ui/Typography';

interface AdvantagesCardProps {
	title: string;
	icon: ReactNode;
}

const AdvantageCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	gap: 25px;
	width: 100%;

	@media (max-width: 576px) {
		max-width: 100%;
		gap: 8px;
	}
`;

const IconContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100px;
`;

export default function AdvantagesCard({ title, icon }: AdvantagesCardProps) {
	return (
		<AdvantageCardContainer>
			<IconContainer>{icon}</IconContainer>
			<Typography variant='SUBTITLE' color='SECONDARY' weight='bold'>
				{title}
			</Typography>
		</AdvantageCardContainer>
	);
}
