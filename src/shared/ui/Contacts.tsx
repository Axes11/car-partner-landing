import { useLanguage } from '@/hooks/useLanguage';
import Typography from './Typography';
import styled from 'styled-components';
import { TColor } from '@/constants/Colors';
import Link from 'next/link';

const ContactsBlock = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export default function Contacts({ color }: { color: TColor }) {
	const contactsData = useLanguage('contacts');
	return (
		<ContactsBlock>
			<Typography color={color} weight='bold'>
				<Link href={`tel:${contactsData?.res?.phone}`}>
					{contactsData?.res?.phone || '+380 00 000 000'}
				</Link>
			</Typography>
			<Typography color={color} weight='bold'>
				{contactsData?.res?.email || 'example@gmail.com'}
			</Typography>
			<Typography color={color} weight='bold'>
				{contactsData?.res?.address || 'вул. Прикладова 1'}
			</Typography>
		</ContactsBlock>
	);
}
