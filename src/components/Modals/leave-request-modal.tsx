import { useLanguage } from '@/hooks/useLanguage';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import Modal from '@/shared/ui/Modal';
import styled from 'styled-components';
import Checkbox from '@/shared/ui/Checkbox';
import Typography from '@/shared/ui/Typography';
import { useState } from 'react';
import { CheckCircle, WarningCircle } from '@phosphor-icons/react';
import { COLORS } from '@/constants/Colors';
import { useModalContext } from '@/shared/context/modalContext';
import { isFormValid } from '@/shared/utils/validate';
import SendRequest from '@/shared/utils/request';

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

const ModalResult = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	gap: 12px;
`;

type FormResult = 'ok' | 'error' | null;

export default function LeaveRequestModal() {
	const languageData = useLanguage('modals');
	const ctx = useModalContext();

	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [isChecked, setIsChecked] = useState(false);
	const [formResult, setFormResult] = useState<FormResult>(null);
	const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
	const [isLoading, setIsLoading] = useState(false);

	const validateForm = (): boolean => {
		const errs: { name?: string; phone?: string } = {};
		if (!name.trim())
			errs.name = languageData?.res.leaveRequest.states.validationError.name;
		if (
			!isFormValid({
				firstValue: name,
				secondInput: { value: phone, type: 'phone' },
			})
		)
			errs.phone = languageData?.res.leaveRequest.states.validationError.phone;
		setErrors(errs);
		return Object.keys(errs).length === 0 && isChecked;
	};

	const submitForm = async () => {
		if (!validateForm()) return;
		setIsLoading(true);

		try {
			const res = await SendRequest({ name, phone });
			setFormResult(res === 'OK' ? 'ok' : 'error');
			setIsLoading(false);
		} catch (e) {
			setFormResult('error');
			setIsLoading(false);
			throw e;
		}
	};

	return (
		<Modal
			title={
				!formResult
					? languageData?.res.leaveRequest.title
					: languageData?.res.leaveRequest.states[formResult].title
			}
			description={
				!formResult
					? languageData?.res.leaveRequest.description
					: languageData?.res.leaveRequest.states[formResult].description
			}>
			<ModalBody>
				{!formResult ? (
					<>
						<Input
							onChange={(e) => setName(e.target.value)}
							placeholder={languageData?.res.leaveRequest.namePlaceholder}
						/>
						{errors.name && (
							<Typography variant='SMALL' color='RED'>
								{errors.name}
							</Typography>
						)}

						<Input
							onChange={(e) => setPhone(e.target.value)}
							placeholder={languageData?.res.leaveRequest.phonePlaceholder}
						/>
						{errors.phone && (
							<Typography variant='SMALL' color='RED'>
								{errors.phone}
							</Typography>
						)}

						<Button disabled={!isChecked || isLoading} onClick={submitForm}>
							{!isLoading
								? languageData?.res.leaveRequest.submitButton
								: languageData?.res.leaveRequest.states.loading}
						</Button>
					</>
				) : (
					<ModalResult>
						{formResult === 'ok' ? (
							<CheckCircle size={170} color={COLORS.SUCCESS} />
						) : (
							<WarningCircle size={170} color={COLORS.RED} />
						)}
						<Button onClick={() => ctx?.setIsRequestModalOpen(false)}>
							{languageData?.res.leaveRequest.states.button}
						</Button>
					</ModalResult>
				)}
			</ModalBody>

			{!formResult && (
				<ModalFooter>
					<Checkbox onChange={() => setIsChecked((prev) => !prev)} />
					<Typography variant='SMALL' color={isChecked ? 'SECONDARY' : 'TEXT'}>
						{languageData?.res.leaveRequest.aggrement}
					</Typography>
				</ModalFooter>
			)}
		</Modal>
	);
}
