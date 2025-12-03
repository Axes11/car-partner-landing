import './globals.css';
import { Oswald } from 'next/font/google';
import { Providers } from './providers';

const oswald = Oswald({ subsets: ['latin'] });

export const metadata = {
	title: 'CarPartner',
	description:
		'Компанія яка допоможе придбати якісне авто за адекватною ціною!',
	openGraph: {
		title: 'CarPartner',
		description:
			'Компанія яка допоможе придбати якісне авто за адекватною ціною!',
		url: 'https://car-partner-landing-pdyf.vercel.app/',
		type: 'website',
		images: [
			{
				url: 'https://car-partner-landing-pdyf.vercel.app/preview.png',
				width: 1200,
				height: 630,
				alt: 'Car Partner Preview',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'CarPartner',
		description:
			'Компанія яка допоможе придбати якісне авто за адекватною ціною!',
		images: ['https://car-partner-landing-pdyf.vercel.app/preview.png'],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className={oswald.className}>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
