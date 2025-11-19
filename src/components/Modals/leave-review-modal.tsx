import { useLanguage } from '@/hooks/useLanguage';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import Modal from '@/shared/ui/Modal';
import styled from 'styled-components';
import Checkbox from '@/shared/ui/Checkbox';
import Typography from '@/shared/ui/Typography';
import { useState } from 'react';

interface LeaveReviewProps {
	modalRef: React.RefObject<HTMLDivElement | null>;
}

const ModalBody = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	margin-bottom: 20px;
	align-items: flex-start;
`;

const ModalFooter = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

export default function LeaveReviewModal({ modalRef }: LeaveReviewProps) {
	const languageData = useLanguage('modals');

	const [isChecked, setIsChecked] = useState(false);

	return (
		<Modal
			modalRef={modalRef}
			title={languageData?.res?.leaveReview.title}
			description={languageData?.res.leaveReview.description}>
			<ModalBody>
				<Input
					onChange={() => {}}
					placeholder={languageData?.res.leaveReview.namePlaceholder}
				/>
				<Input
					onChange={() => {}}
					placeholder={languageData?.res.leaveReview.reviewPlaceholder}
					type={'textarea'}
				/>
				<Button disabled={!isChecked}>
					{languageData?.res.leaveReview.submitButton}
				</Button>
			</ModalBody>
			<ModalFooter>
				<Checkbox onChange={() => setIsChecked((prev) => !prev)} />
				<Typography variant={'SMALL'} color={isChecked ? 'SECONDARY' : 'TEXT'}>
					{languageData?.res.leaveReview.aggrement}
				</Typography>
			</ModalFooter>
		</Modal>
	);
}
