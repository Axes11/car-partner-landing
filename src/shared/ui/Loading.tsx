import styled from 'styled-components';
import Logo from './Logo';
import { COLORS } from '@/constants/Colors';
import { useContext } from 'react';
import { LoadingContext } from '../providers/loadingProvider';

const LoadingContainer = styled.div`
	display: flex;
	position: fixed;
	z-index: 9999;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;
	background-color: ${COLORS.BLACK};
`;

export default function Loading() {
	const loadingState = useContext(LoadingContext);

	return (
		<>
			{loadingState?.isLoading && (
				<LoadingContainer>
					<Logo />
				</LoadingContainer>
			)}
		</>
	);
}
