import styled from 'styled-components';
import Typography from './Typography';
import { COLORS } from '@/constants/Colors';

interface ModalProps {
	title: string;
	description: string;
	modalRef: React.RefObject<HTMLDivElement | null>;
	children: React.ReactNode;
}

const ModalContainer = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: none;
	opacity: 0;

	max-width: 350px;
	z-index: 10000;
	padding: 16px 16px 32px;
	background-color: ${COLORS.BACKGROUND};
	border-radius: 8px;
	border: 1px solid ${COLORS.SECONDARY};
`;

const ModalHeader = styled.div`
	margin-bottom: 20px;
`;

export default function Modal({
	title,
	description,
	modalRef,
	children,
}: ModalProps) {
	return (
		<ModalContainer ref={modalRef}>
			<ModalHeader>
				<Typography variant={'SUBTITLE'} color={'TEXT'} weight={'bold'}>
					{title}
				</Typography>
				<Typography variant={'TEXT'} color={'TEXT'} weight={'normal'}>
					{description}
				</Typography>
			</ModalHeader>
			{children}
		</ModalContainer>
	);
}
