import { useLanguage } from '@/hooks/useLanguage';
import { useModalContext } from '@/shared/context/modalContext';
import SendRequest from '@/shared/utils/request';
import SendReview from '@/shared/utils/review';
import { useState } from 'react';

type FormResult = 'ok' | 'error' | null;

interface FormState {
	formResult: FormResult;
	errors: Error;
	isLoading: boolean;
}

interface FormInputs {
	name: string;
	phone: string;
	review: string;
	isChecked: boolean;
}

interface Error {
	name?: string | null;
	phone?: string | null;
	review?: string | null;
}

export default function useModal() {
	const languageData = useLanguage('modals');
	const [formInputs, setFormInputs] = useState<FormInputs>({
		name: '',
		phone: '',
		review: '',
		isChecked: false,
	});
	const [formState, setFormState] = useState<FormState>({
		formResult: null,
		errors: {},
		isLoading: false,
	});

	const ctx = useModalContext();

	const [preview, setPreview] = useState<string | null>(null);
	const [file, setFile] = useState<File | null>(null);

	const handleSelectImg = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setFile(file);
		} else {
			return;
		}

		setPreview(URL.createObjectURL(file));
	};

	const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setFile(null);
		setPreview(null);
	};

	const clearForm = () => {
		ctx?.setIsReviewModalOpen(false);

		setFormInputs({
			name: '',
			phone: '',
			review: '',
			isChecked: false,
		});

		setFormState({
			formResult: null,
			errors: {},
			isLoading: false,
		});

		setFile(null);
		setPreview(null);
	};

	const validateForm = (
		field1: { key: string; value: string },
		field2: { key: string; value: string },
		form: 'leaveReview' | 'leaveRequest',
	): boolean => {
		const errs: Record<string, string> = {};

		if (!field1.value.trim() || field1.value.length < 3) {
			errs[field1.key] =
				languageData?.res[form].states.validationError[field1.key];
		}
		if (!field2.value.trim()) {
			errs[field2.key] =
				languageData?.res[form].states.validationError[field2.key];
		}

		setFormState((prev) => ({
			...prev,
			errors: errs,
		}));
		return Object.keys(errs).length === 0 && formInputs.isChecked;
	};

	const sendReview = async () => {
		if (
			!validateForm(
				{ key: 'name', value: formInputs.name },
				{ key: 'review', value: formInputs.review },
				'leaveReview',
			)
		)
			return;
		setFormState((prev) => ({
			...prev,
			isLoading: true,
		}));

		try {
			const res = file
				? await SendReview({
						name: formInputs.name,
						review: formInputs.review,
						file,
				  })
				: await SendReview({
						name: formInputs.name,
						review: formInputs.review,
				  });
			setFormState((prev) => ({
				...prev,
				isLoading: false,
				formResult: res === 'OK' ? 'ok' : 'error',
			}));

			setTimeout(() => {
				clearForm();
			}, 3000);
		} catch (e) {
			setFormState((prev) => ({
				...prev,
				isLoading: false,
				formResult: 'error',
			}));
			setTimeout(() => {
				clearForm();
			}, 3000);
			throw e;
		}
	};

	const sendRequest = async () => {
		if (
			!validateForm(
				{ key: 'name', value: formInputs.name },
				{ key: 'phone', value: formInputs.phone },
				'leaveRequest',
			)
		)
			return;
		setFormState((prev) => ({
			...prev,
			isLoading: true,
		}));

		try {
			const res = await SendRequest({
				name: formInputs.name,
				phone: formInputs.phone,
			});
			setFormState((prev) => ({
				...prev,
				isLoading: false,
				formResult: res === 'OK' ? 'ok' : 'error',
			}));

			setTimeout(() => {
				clearForm();
			}, 3000);
		} catch (e) {
			setFormState((prev) => ({
				...prev,
				isLoading: false,
				formResult: 'error',
			}));
			setTimeout(() => {
				clearForm();
			}, 3000);
			throw e;
		}
	};

	return {
		formInputs,
		formState,
		handleSelectImg,
		setFormInputs,
		handleRemoveImage,
		sendReview,
		sendRequest,
		preview,
		ctx,
	};
}
