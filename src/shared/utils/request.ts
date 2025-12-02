import emailjs from '@emailjs/browser';

interface SendRequestProps {
	name: string;
	phone: string;
}

export default async function SendRequest({
	name,
	phone,
}: SendRequestProps): Promise<'OK' | 'error'> {
	const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
	const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
	const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

	try {
		const res = await emailjs.send(
			serviceID,
			templateID,
			{ name, phone },
			publicKey,
		);

		return res.status === 200 ? 'OK' : 'error';
	} catch (e) {
		return 'error';
	}
}
