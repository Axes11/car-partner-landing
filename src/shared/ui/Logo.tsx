import styled from 'styled-components';
import LogoIcon from '@/assets/icons/Logo';
import Typography from './Typography';

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
	return (
		<LogoContainer>
			<LogoIcon />
			<TextBlock>
				<Typography variant='SUBTITLE' color='TEXT' weight={'bold'}>
					CARPARTNER
				</Typography>
				<StyledTypography variant='TEXT' color='TEXT' weight={'bold'}>
					DEIN AUTO. UNSER JOB.
				</StyledTypography>
			</TextBlock>
		</LogoContainer>
	);
}
