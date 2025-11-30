import styled from 'styled-components';

import {
	InstagramLogo,
	TelegramLogo,
	WhatsappLogo,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { COLORS, TColor } from '@/constants/Colors';

const SocialsWrapper = styled.div`
	display: flex;
	gap: 8px;
	margin-top: 12px;
`;

export default function Socials({ color }: { color: TColor }) {
	const contactsData = useLanguage('contacts');

	return (
		<SocialsWrapper>
			<Link
				href={contactsData?.res?.instagram}
				target='_blank'
				rel='noopener noreferrer'>
				<InstagramLogo size={24} color={COLORS[color]} />
			</Link>
			<Link
				href={contactsData?.res?.whatsApp}
				target='_blank'
				rel='noopener noreferrer'>
				<WhatsappLogo size={24} color={COLORS[color]} />
			</Link>
			<Link
				href={contactsData?.res?.telegram}
				target='_blank'
				rel='noopener noreferrer'>
				<TelegramLogo size={24} color={COLORS[color]} />
			</Link>
		</SocialsWrapper>
	);
}
