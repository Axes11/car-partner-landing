import LeaveRequest from '@/components/Modals/leave-request-modal';
import LeaveReview from '@/components/Modals/leave-review-modal';

import { createContext, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Overlay from '../ui/Overlay';
import { useLoadingContext } from '../context/loadingContext';

export interface ModalContextType {
	setIsRequestModalOpen: (isOpen: boolean) => void;
	setIsReviewModalOpen: (isOpen: boolean) => void;
	isRequestModalOpen: boolean;
	isReviewModalOpen: boolean;
	children?: React.ReactNode;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
	const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

	const [isRequestModalRendered, setIsRequestModalRendered] = useState(false);
	const [isReviewModalRendered, setIsReviewModalRendered] = useState(false);

	const ctx = useLoadingContext();

	const requestModal = useRef<HTMLDivElement | null>(null);
	const reviewModal = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!requestModal.current) return;
		if (!isRequestModalOpen) {
			gsap.fromTo(
				requestModal.current,
				{ y: -175, opacity: 1, duration: 0.1 },
				{ y: -375, opacity: 0, display: 'none' },
			);
		} else {
			gsap.fromTo(
				requestModal.current,
				{ y: 100, opacity: 0 },
				{ y: -175, opacity: 1, display: 'block' },
			);
		}
	}, [isRequestModalOpen]);

	useEffect(() => {
		if (!reviewModal.current) return;
		if (!isReviewModalOpen) {
			gsap.fromTo(
				reviewModal.current,
				{ y: -175, opacity: 1, duration: 0.1 },
				{ y: -375, opacity: 0, display: 'none' },
			);
		} else {
			gsap.fromTo(
				reviewModal.current,
				{ y: 100, opacity: 0 },
				{ y: -175, opacity: 1, display: 'block' },
			);
		}
	}, [isReviewModalOpen]);

	useEffect(() => {
		if (!ctx?.isLoading) {
			setIsRequestModalRendered(true);
		}
	}, [ctx?.isLoading]);

	useEffect(() => {
		if (!ctx?.isLoading) {
			setIsReviewModalRendered(true);
		}
	}, [ctx?.isLoading]);

	return (
		<ModalContext.Provider
			value={{
				setIsRequestModalOpen,
				setIsReviewModalOpen,
				isRequestModalOpen,
				isReviewModalOpen,
			}}>
			<>
				{isRequestModalOpen && <Overlay />}
				{isRequestModalRendered && !ctx?.isLoading && (
					<LeaveRequest modalRef={requestModal} />
				)}
			</>
			<>
				{isReviewModalOpen && <Overlay />}
				{isReviewModalRendered && !ctx?.isLoading && (
					<LeaveReview modalRef={reviewModal} />
				)}
			</>

			{children}
		</ModalContext.Provider>
	);
};
