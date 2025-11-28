import { useLanguage } from '@/hooks/useLanguage';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import Modal from '@/shared/ui/Modal';
import styled from 'styled-components';
import Checkbox from '@/shared/ui/Checkbox';
import Typography from '@/shared/ui/Typography';
import { CheckCircle, WarningCircle, X } from '@phosphor-icons/react';
import { COLORS } from '@/constants/Colors';
import { useModalContext } from '@/shared/context/modalContext';
import useReviewModal from './hooks/useReviewModal';
import Image from 'next/image';

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

const ModalResult = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	gap: 12px;
`;

const CustomLabel = styled.label<{ preview: boolean }>`
	position: relative;
	width: 78px;
	height: 78px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	font-size: 40px;
	user-select: none;
	border: ${({ preview }) => (preview ? '' : `2px dashed ${COLORS.ACCENT}`)};
	color: ${COLORS.ACCENT};
`;

const RemoveImage = styled.button`
	position: absolute;
	top: 0;
	right: 0;
	width: 24px;
	height: 24px;
	background-color: ${COLORS.ACCENT};
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;

const CustomImage = styled(Image)`
	width: 75px;
	height: 75px;
	border-radius: 50%;
	object-fit: cover;
`;

const AvatarSelectWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default function LeaveReviewModal({ modalRef }: LeaveReviewProps) {
	const languageData = useLanguage('modals');
	const ctx = useModalContext();

	const {
		formResult,
		setName,
		errors,
		setReview,
		isChecked,
		isLoading,
		sendReview,
		setIsChecked,
		handleSelectImg,
		preview,
		handleRemoveImage,
	} = useReviewModal();

	return (
		<Modal
			modalRef={modalRef}
			title={languageData?.res?.leaveReview.title}
			description={languageData?.res.leaveReview.description}>
			<ModalBody>
				{!formResult ? (
					<>
						<AvatarSelectWrapper>
							<CustomLabel htmlFor='avatar' preview={preview}>
								{preview ? (
									<>
										<RemoveImage onClick={(e) => handleRemoveImage(e)}>
											<X size={16} weight='bold' color={`${COLORS.BLACK}`} />
										</RemoveImage>
										<CustomImage
											src={preview}
											alt='avatar'
											width={75}
											height={75}
										/>
									</>
								) : (
									'+'
								)}
							</CustomLabel>
							<input
								id='avatar'
								type='file'
								accept='image/*'
								style={{ display: 'none' }}
								onChange={handleSelectImg}
							/>
						</AvatarSelectWrapper>
						<Input
							onChange={(e) => setName(e.target.value)}
							placeholder={languageData?.res.leaveReview.namePlaceholder}
						/>
						{errors.name && (
							<Typography variant='SMALL' color='RED'>
								{errors.name}
							</Typography>
						)}

						<Input
							onChange={(e) => setReview(e.target.value)}
							placeholder={languageData?.res.leaveReview.reviewPlaceholder}
							type='textarea'
						/>
						{errors.review && (
							<Typography variant='SMALL' color='RED'>
								{errors.review}
							</Typography>
						)}

						<Button disabled={!isChecked || isLoading} onClick={sendReview}>
							{!isLoading
								? languageData?.res.leaveReview.submitButton
								: languageData?.res.leaveReview.states.loading}
						</Button>
					</>
				) : (
					<ModalResult>
						{formResult === 'ok' ? (
							<CheckCircle size={170} color={COLORS.SUCCESS} />
						) : (
							<WarningCircle size={170} color={COLORS.RED} />
						)}
						<Button onClick={() => ctx?.setIsReviewModalOpen(false)}>
							{languageData?.res.leaveRequest.states.button}
						</Button>
					</ModalResult>
				)}
			</ModalBody>

			{!formResult && (
				<ModalFooter>
					<Checkbox onChange={() => setIsChecked((prev) => !prev)} />
					<Typography variant='SMALL' color={isChecked ? 'SECONDARY' : 'TEXT'}>
						{languageData?.res.leaveReview.aggrement}
					</Typography>
				</ModalFooter>
			)}
		</Modal>
	);
}
