import styled from 'styled-components';

interface ContainerProps {
	children: React.ReactNode;
	className?: string;
	id?: string;
}

const StyledContainer = styled.div`
	max-width: 1400px;
	padding: 16px 16px;
	margin: 0 auto;
	margin-bottom: 80px;
`;

export default function Container({ children, className, id }: ContainerProps) {
	return (
		<StyledContainer id={id} className={className}>
			{children}
		</StyledContainer>
	);
}
