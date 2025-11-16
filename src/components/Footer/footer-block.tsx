import styled from 'styled-components';

import Container from '@/shared/ui/Container';
import { COLORS } from '@/constants/Colors';
import Typography from '@/shared/ui/Typography';
import { useLanguage } from '@/hooks/useLanguage';
import {
	InstagramLogo,
	TelegramLogo,
	WhatsappLogo,
} from '@phosphor-icons/react';
import Link from 'next/link';

const ContainerBackground = styled.div`
	background-color: ${COLORS.ACCENT};
	padding-top: 24px;
`;

const TitleBlock = styled.div`
	margin-bottom: 16px;
`;

const BottomBlock = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin-top: 24px;
`;

const CenterBlock = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: start;
`;

const ContactsBlock = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const Socials = styled.div`
	display: flex;
	gap: 8px;
	margin-top: 12px;
`;

export default function FooterBlock() {
	const languageData = useLanguage('footerBlock');
	const contactsData = useLanguage('contacts');

	return (
		<ContainerBackground>
			<Container id={'footer'}>
				<TitleBlock>
					<Typography variant='SUBTITLE' color='BLACK' weight='bold'>
						{languageData?.res?.title || 'КОНТАКТЫ'}
					</Typography>
				</TitleBlock>
				<CenterBlock>
					<ContactsBlock>
						<Typography color='BLACK' weight='bold'>
							{contactsData?.res?.phone || '+380 00 000 000'}
						</Typography>
						<Typography color='BLACK' weight='bold'>
							{contactsData?.res?.email || 'example@gmail.com'}
						</Typography>
						<Typography color='BLACK' weight='bold'>
							{contactsData?.res?.address || 'вул. Прикладова 1'}
						</Typography>
						<Socials>
							<Link
								href={contactsData?.res?.instagram}
								target='_blank'
								rel='noopener noreferrer'>
								<InstagramLogo size={24} />
							</Link>
							<Link
								href={contactsData?.res?.whatsApp}
								target='_blank'
								rel='noopener noreferrer'>
								<WhatsappLogo size={24} />
							</Link>

							<Link
								href={contactsData?.res?.telegram}
								target='_blank'
								rel='noopener noreferrer'>
								<TelegramLogo size={24} />
							</Link>
						</Socials>
					</ContactsBlock>
					<iframe
						src={languageData?.res?.mapLink}
						width='400'
						height='200'
						loading='lazy'
					/>
				</CenterBlock>
				<BottomBlock>
					<Typography color='BLACK' weight='bold'>
						© 2024 CarPartner. All rights reserved.
					</Typography>
				</BottomBlock>
			</Container>
		</ContainerBackground>
	);
}
