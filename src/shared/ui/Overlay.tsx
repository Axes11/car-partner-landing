import { COLORS } from '@/constants/Colors';
import styled from 'styled-components';
import { useModalContext } from '../context/modalContext';

const CustomOverlay = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	background-color: ${COLORS.BLACK};
	opacity: 0.6;
	z-index: 5000;

	overflow-y: hidden;
`;

export default function Overlay() {
	const ctx = useModalContext();

	const dropModals = () => {
		ctx?.setIsRequestModalOpen(false);
		ctx?.setIsReviewModalOpen(false);
	};

	return <CustomOverlay onClick={() => dropModals()} />;
}
