import LeaveRequest from '@/components/Modals/leave-request-modal';
import LeaveReview from '@/components/Modals/leave-review-modal';

import { createContext, useState } from 'react';
import Overlay from '../ui/Overlay';

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

	return (
		<ModalContext.Provider
			value={{
				setIsRequestModalOpen,
				setIsReviewModalOpen,
				isRequestModalOpen,
				isReviewModalOpen,
			}}>
			{isReviewModalOpen && (
				<>
					<Overlay />
					<LeaveReview />
				</>
			)}
			{isRequestModalOpen && (
				<>
					<Overlay />
					<LeaveRequest />
				</>
			)}

			{children}
		</ModalContext.Provider>
	);
};
