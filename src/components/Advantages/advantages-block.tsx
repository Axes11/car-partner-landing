import styled from 'styled-components';

import Container from '@/shared/ui/Container';
import AdvantageCard from './advantage-card';
import { useLanguage } from '@/hooks/useLanguage';

import CarIcon from '@/assets/icons/advantages/CarIcon';
import ProffesionalIcon from '@/assets/icons/advantages/Proffesionalcon';
import TrackIcon from '@/assets/icons/advantages/TrackIcon';
import FinanceIcon from '@/assets/icons/advantages/FinanceIcon';

const StyledContainer = styled(Container)`
	display: flex;
	align-items: flex-start;
	justify-content: center;
	margin: 0 0 !important;
	width: 100%;
`;

export default function AdvantagesBlock() {
	const languageData = useLanguage('advantagesBlock');

	const icons = [
		<CarIcon size={80} key='car-icon' />,
		<ProffesionalIcon size={80} key='prof-icon' />,
		<TrackIcon size={100} key='track-icon' />,
		<FinanceIcon size={80} key='finance-icon' />,
	];

	return (
		<StyledContainer>
			{Object.entries(languageData?.res).map(([key, value], index) => (
				<AdvantageCard key={key} title={String(value)} icon={icons[index]} />
			))}
		</StyledContainer>
	);
}
