import styled from 'styled-components';

interface CenteredProps {
	children: React.ReactNode;
}

const CenteredWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default function Centered({ children }: CenteredProps) {
	return <CenteredWrapper>{children}</CenteredWrapper>;
}
