import { useLanguage } from '@/hooks/useLanguage';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import Modal from '@/shared/ui/Modal';
import styled from 'styled-components';
import Checkbox from '@/shared/ui/Checkbox';
import Typography from '@/shared/ui/Typography';
import { CheckCircle, WarningCircle } from '@phosphor-icons/react';
import { COLORS } from '@/constants/Colors';
import useModal from './hooks/useModal';

interface LeaveRequestProps {
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

const ModalResult = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	gap: 12px;
`;

export default function LeaveRequestModal({ modalRef }: LeaveRequestProps) {
	const languageData = useLanguage('modals');

	const { formInputs, formState, setFormInputs, sendRequest, ctx } = useModal();

	return (
		<Modal
			modalRef={modalRef}
			title={
				!formState.formResult
					? languageData?.res.leaveRequest.title
					: languageData?.res.leaveRequest.states[formState.formResult].title
			}
			description={
				!formState.formResult
					? languageData?.res.leaveRequest.description
					: languageData?.res.leaveRequest.states[formState.formResult]
							.description
			}>
			<ModalBody>
				{!formState.formResult ? (
					<>
						<Input
							onChange={(e) =>
								setFormInputs((prev) => ({
									...prev,
									name: e.target.value,
								}))
							}
							placeholder={languageData?.res.leaveRequest.namePlaceholder}
						/>

						{formState.errors.name && (
							<Typography variant='SMALL' color='RED'>
								{formState.errors.name}
							</Typography>
						)}

						<Input
							onChange={(e) =>
								setFormInputs((prev) => ({
									...prev,
									phone: e.target.value,
								}))
							}
							placeholder={languageData?.res.leaveRequest.phonePlaceholder}
						/>
						{formState.errors.phone && (
							<Typography variant='SMALL' color='RED'>
								{formState.errors.phone}
							</Typography>
						)}

						<Button
							disabled={!formInputs.isChecked || formState.isLoading}
							onClick={sendRequest}>
							{!formState.isLoading
								? languageData?.res.leaveRequest.submitButton
								: languageData?.res.leaveRequest.states.loading}
						</Button>
					</>
				) : (
					<ModalResult>
						{formState.formResult === 'ok' ? (
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

			{!formState.formResult && (
				<ModalFooter>
					<Checkbox
						onChange={() =>
							setFormInputs((prev) => ({
								...prev,
								isChecked: !prev.isChecked,
							}))
						}
					/>
					<Typography
						variant='SMALL'
						color={formInputs.isChecked ? 'SECONDARY' : 'TEXT'}>
						{languageData?.res.leaveRequest.aggrement}
					</Typography>
				</ModalFooter>
			)}
		</Modal>
	);
}
