import { useLanguage } from '@/hooks/useLanguage';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import Modal from '@/shared/ui/Modal';
import styled from 'styled-components';
import Checkbox from '@/shared/ui/Checkbox';
import Typography from '@/shared/ui/Typography';
import { useEffect, useState } from 'react';

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

export default function LeaveRequestModal() {
	const languageData = useLanguage('modals');

	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		console.log(isChecked);
	}, [isChecked]);

	return (
		<Modal
			title={languageData?.res?.leaveRequest.title}
			description={languageData?.res.leaveRequest.description}>
			<ModalBody>
				<Input placeholder={languageData?.res.leaveRequest.namePlaceholder} />
				<Input placeholder={languageData?.res.leaveRequest.phonePlaceholder} />
				<Button disabled={!isChecked}>
					{languageData?.res.leaveRequest.submitButton}
				</Button>
			</ModalBody>
			<ModalFooter>
				<Checkbox onChange={() => setIsChecked((prev) => !prev)} />
				<Typography variant={'SMALL'} color={isChecked ? 'SECONDARY' : 'TEXT'}>
					{languageData?.res.leaveRequest.aggrement}
				</Typography>
			</ModalFooter>
		</Modal>
	);
}
