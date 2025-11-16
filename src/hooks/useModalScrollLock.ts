import { useEffect } from 'react';
import { useModalContext } from '@/shared/context/modalContext';

export function useModalScrollLock() {
  const ctx = useModalContext();

  useEffect(() => {
    if (!ctx) return;

    const isOpen = ctx.isRequestModalOpen || ctx.isReviewModalOpen;

    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }

    return () => {
      document.body.style.overflowY = '';
    };
  }, [ctx, ctx?.isRequestModalOpen, ctx?.isReviewModalOpen]);
}
