interface SecondInput {
	value: string;
	type: 'phone' | 'text';
}

interface ValidationPayload {
	firstValue: string;
	secondInput: SecondInput;
}

export function isFormValid({ firstValue, secondInput }: ValidationPayload): boolean {
	if (!firstValue.trim() || firstValue.length < 2) return false;

	const { value, type } = secondInput;

	if (type === 'phone') {
		const phoneRegex = /^[0-9+\-() ]{7,20}$/;
		return phoneRegex.test(value);
	}

	if (type === 'text') {
		return value.trim().length >= 2;
	}

	return false;
}
