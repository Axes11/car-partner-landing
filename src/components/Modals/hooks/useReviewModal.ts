import { useLanguage } from '@/hooks/useLanguage';
import SendReview from '@/shared/utils/review';
import { useState } from 'react';

type FormResult = 'ok' | 'error' | null;

export default function useReviewModal() {
	const languageData = useLanguage('modals');
	const [name, setName] = useState('');
	const [review, setReview] = useState('');
	const [isChecked, setIsChecked] = useState(false);
	const [formResult, setFormResult] = useState<FormResult>(null);
	const [errors, setErrors] = useState<{ name?: string; review?: string }>({});
	const [isLoading, setIsLoading] = useState(false);

	const [preview, setPreview] = useState(null);
	const [file, setFile] = useState();

	const handleSelectImg = (e) => {
		const file = e.target.files[0];
		setFile(file);
		if (!file) return;

		setPreview(URL.createObjectURL(file));
	};

	const handleRemoveImage = (e) => {
		e.preventDefault();
		setFile(null);
		setPreview(null);
	};

	const validateForm = (): boolean => {
		const errs: { name?: string; review?: string } = {};

		if (!name.trim() || name.length < 3) {
			errs.name = languageData?.res.leaveReview.states.validationError.name;
		}
		if (!review.trim()) {
			errs.review = languageData?.res.leaveReview.states.validationError.review;
		}

		setErrors(errs);
		return Object.keys(errs).length === 0 && isChecked;
	};

	const sendReview = async () => {
		if (!validateForm()) return;
		setIsLoading(true);

		try {
			const res = file
				? await SendReview({ name, review, file })
				: await SendReview({ name, review });
			setFormResult(res === 'OK' ? 'ok' : 'error');
			setIsLoading(false);
		} catch (e) {
			setFormResult('error');
			setIsLoading(false);
			throw e;
		}
	};

	return {
		name,
		setName,
		review,
		setReview,
		isChecked,
		setIsChecked,
		formResult,
		setFormResult,
		preview,
		handleSelectImg,
		errors,
		isLoading,
		sendReview,
		handleRemoveImage,
	};
}
