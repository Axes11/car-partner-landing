import styled from 'styled-components';

import Typography from '@/shared/ui/Typography';

interface CardProps {
	title: string;
	description: string;
	isActive: boolean;
	align: 'right' | 'center' | 'left' | undefined;
}

const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

const StyledTypography = styled(Typography)<{
	isActive?: boolean;
	align?: 'right' | 'center' | 'left';
}>`
	opacity: ${({ isActive }) => (isActive ? 1 : 0.1)};
	text-align: ${({ align }) => (align ? align : 'center')};
`;

export default function Card({
	title,
	description,
	isActive = false,
	align,
	...props
}: CardProps) {
	return (
		<CardContainer {...props}>
			<StyledTypography
				isActive={isActive}
				variant='TEXT'
				color='SECONDARY'
				weight='bold'
				align={align}>
				{title}
			</StyledTypography>
			<StyledTypography
				isActive={isActive}
				variant='TEXT'
				color='SECONDARY'
				weight='bold'
				align={align}>
				{description}
			</StyledTypography>
		</CardContainer>
	);
}
