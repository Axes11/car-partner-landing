import { COLORS } from '@/constants/Colors';
import styled from 'styled-components';

interface InputProps {
	placeholder?: string;
}

const CustomInput = styled.input`
	width: 100%;
	border: none;
	outline: none;
	border-bottom: 2px solid ${COLORS.DARKGREY};
	padding: 5px 10px;
	font-size: 14px;

	&::placeholder {
		color: ${COLORS.DIVIDERSACT};
	}

	&:focus {
		border-bottom: 2px solid ${COLORS.ACCENT};
		color: ${COLORS.SECONDARY};
	}
`;

export default function Input({ placeholder }: InputProps) {
	return <CustomInput placeholder={placeholder} />;
}
