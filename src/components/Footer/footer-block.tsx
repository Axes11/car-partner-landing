import styled from 'styled-components';

import Container from '@/shared/ui/Container';
import { COLORS } from '@/constants/Colors';
import Typography from '@/shared/ui/Typography';
import { useLanguage } from '@/hooks/useLanguage';
import Socials from '@/shared/ui/Socials';
import Contacts from '@/shared/ui/Contacts';

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

const ContactsWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const CenterBlock = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: start;

	@media (max-width: 576px) {
		flex-direction: column;
		gap: 20px;
	}
`;

export default function FooterBlock() {
	const languageData = useLanguage('footerBlock');

	return (
		<ContainerBackground>
			<Container id={'footer'}>
				<TitleBlock>
					<Typography variant='SUBTITLE' color='BLACK' weight='bold'>
						{languageData?.res?.title || 'КОНТАКТЫ'}
					</Typography>
				</TitleBlock>
				<CenterBlock>
					<ContactsWrapper>
						<Contacts color={'BLACK'} />
						<Socials color={'BLACK'} />
					</ContactsWrapper>
					<iframe
						src={languageData?.res?.mapLink}
						width='360'
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
