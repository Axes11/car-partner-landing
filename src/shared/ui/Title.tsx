import styled from 'styled-components';
import { ReactNode } from 'react';

import Typography from './Typography';

import { COLORS } from '@/constants/Colors';

interface ITitle {
	children: ReactNode;
}

const TitleContainer = styled.div`
	display: flex;
	gap: 35px;
	align-items: stretch;
`;

const TitleDecorLine = styled.div`
	width: 10px;
	background: ${COLORS.ACCENT};
`;

export default function Title({ children }: ITitle) {
	return (
		<TitleContainer>
			<TitleDecorLine />
			<Typography variant='TITLE' color='SECONDARY' weight='bold'>
				{children}
			</Typography>
		</TitleContainer>
	);
}
