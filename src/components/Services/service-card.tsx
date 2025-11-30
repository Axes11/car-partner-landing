import { COLORS } from '@/constants/Colors';
import Logo from '@/shared/ui/Logo';
import Typography from '@/shared/ui/Typography';
import styled from 'styled-components';

interface ServicesCardTextProps {
	title: string;
	description: string;
}

const Card = styled.div`
	padding: 120px 8px 16px;
	border-bottom: 2px solid ${COLORS.ACCENT};
	transition: all 0.3s;
	min-height: 228px;

	&:hover {
		transform: scale(1.02);
		cursor: pointer;
		background: transparent;
	}
`;

const EmptyCard = styled(Card)`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0;
	border-bottom: 2px solid ${COLORS.ACCENT};
`;

export default function ServicesCard({
	title,
	description,
}: ServicesCardTextProps) {
	return (
		<>
			{title && description ? (
				<Card>
					<Typography variant='SUBTITLE' color='ACCENT' weight='bold'>
						{title}
					</Typography>
					<Typography variant='TEXT' color='TEXT'>
						{description}
					</Typography>
				</Card>
			) : (
				<EmptyCard>
					<Logo />
				</EmptyCard>
			)}
		</>
	);
}
