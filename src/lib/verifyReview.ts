import { GoogleGenAI, Part } from '@google/genai';
import { Buffer } from 'buffer';

interface VerifyReviewProps {
	name: string;
	review: string;
	file?: File | null;
}

async function fileToGenerativePart(file: File): Promise<Part> {
	const buffer = await file.arrayBuffer();
	const base64Data = Buffer.from(buffer).toString('base64');

	const mimeType = file.type;

	return {
		inlineData: {
			data: base64Data,
			mimeType,
		},
	};
}

export default async function VerifyReview({
	name,
	review,
	file,
}: VerifyReviewProps): Promise<boolean | null> {
	const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_STUDIO_API! });

	let imagePart: Part | undefined;

	if (file) {
		imagePart = await fileToGenerativePart(file);
	}

	const textPrompt = `Validate this review and the accompanying avatar image (if provided), and return true if both are valid. 
    A valid review and image do NOT contain:
    - Bad words, profanity, or offensive language
    - Sexually explicit content or nudity
    - Hate speech or discrimination (racism, sexism, homophobia, etc.)
    - Threats, violence, or encouragement of illegal activities
    - Spam, advertisements, or irrelevant links
    - No sense like just set of random letters or smth like that
	- If its russian propaganda with words like ZOV ZVO or smth bad about Ukraine 
	- Image (if provided) cant be photo of president or politics
	- If its not depends to cars, review must be associated with cars or expirence of bying cars through company or just expirence about support / service and others

    Return false if any of the above are present in EITHER the review text or the avatar image. Only analyze the user's name: "${name}", and the review text and the avatar image.

    Here is the review text: "${review}"

    Return only 1 word true or false
    `;

	const contents: Part[] = [{ text: textPrompt }];

	if (imagePart) {
		contents.push(imagePart);
	}

	const response = await ai.models.generateContent({
		model: 'gemini-2.5-flash',
		contents: contents,
	});

	if (response.text?.toLowerCase().trim() === 'true') {
		return true;
	} else {
		return false;
	}
}
