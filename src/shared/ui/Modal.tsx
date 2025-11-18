import styled from 'styled-components';
import Typography from './Typography';
import { COLORS } from '@/constants/Colors';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ModalProps {
	title: string;
	description: string;
	children: React.ReactNode;
}

const ModalContainer = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	max-width: 350px;
	max-height: 380px;
	z-index: 10000;
	padding: 16px 16px 32px;
	background-color: ${COLORS.BACKGROUND};
	border-radius: 8px;
	border: 1px solid ${COLORS.SECONDARY};
`;

const ModalHeader = styled.div`
	margin-bottom: 20px;
`;

export default function Modal({ title, description, children }: ModalProps) {
	const modal = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!modal.current) return;
		gsap.fromTo(modal.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1 });
	}, []);

	return (
		<ModalContainer ref={modal}>
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
