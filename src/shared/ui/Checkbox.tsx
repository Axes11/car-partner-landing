import styled from 'styled-components';
import { COLORS } from '@/constants/Colors';

interface CheckboxProps {
	onChange: () => void;
}

const CheckboxContainer = styled.label`
	display: inline-block;
	position: relative;
	cursor: pointer;
	width: 20px;
	height: 20px;

	input {
		opacity: 0;
		width: 0;
		height: 0;
		position: absolute;
	}

	span {
		position: absolute;
		top: 0;
		left: 0;
		height: 24px;
		width: 24px;
		background-color: transparent;
		border: 2px solid ${COLORS.ACCENT};
		transition: all 0.2s ease;
		border-radius: 0; /* острые края */
	}

	span::after {
		content: '';
		position: absolute;
		display: none;
		left: 6px;
		top: 2px;
		width: 6px;
		height: 12px;
		border: solid ${COLORS.ACCENT};
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}

	input:checked + span::after {
		display: block;
	}
`;

export default function Checkbox({ onChange }: CheckboxProps) {
	return (
		<CheckboxContainer>
			<input type='checkbox' onChange={onChange} />
			<span />
		</CheckboxContainer>
	);
}
