import styled from 'styled-components';

import Container from '@/shared/ui/Container';
import { COLORS } from '@/constants/Colors';
import Typography from '@/shared/ui/Typography';

const ContainerBackground = styled.div`
	background-color: ${COLORS.ACCENT};
	padding-top: 24px;
	padding-bottom: 24px;
`;

export default function FooterBlock() {
	return (
		<ContainerBackground>
			<Container>
				<Typography>test</Typography>
			</Container>
		</ContainerBackground>
	);
}
