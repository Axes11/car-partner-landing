import styled from 'styled-components';

interface ContainerProps {
	children: React.ReactNode;
	className?: string;
}

const StyledContainer = styled.div`
	max-width: 1400px;
	padding: 16px 16px;
	margin: 0 auto;
`;

export default function Container({ children, className }: ContainerProps) {
	return <StyledContainer className={className}>{children}</StyledContainer>;
}
