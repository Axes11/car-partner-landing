import { COLORS } from '@/constants/Colors';
import { useState } from 'react';
import styled from 'styled-components';
import Typography from './Typography';

interface InputProps {
	placeholder?: string;
	type?: 'input' | 'textarea';
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
}

const MAX_LENGTH = 200;

const CustomInput = styled.input`
	width: 100%;
	border: none;
	outline: none;
	border-bottom: 2px solid ${COLORS.DARKGREY};
	padding: 5px 10px;
	font-size: 14px;
	color: ${COLORS.SECONDARY};

	&::placeholder {
		color: ${COLORS.DIVIDERSACT};
	}

	&:focus {
		border-bottom: 2px solid ${COLORS.ACCENT};
		color: ${COLORS.SECONDARY};
	}
`;

const TextareaWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	width: 100%;
`;

const CustomTextarea = styled.textarea<{ length: number }>`
	width: 100%;
	border: none;
	outline: none;
	border-bottom: 2px solid
		${({ length }) => (length === MAX_LENGTH ? COLORS.RED : COLORS.DARKGREY)};
	padding: 5px 10px;
	font-size: 14px;
	color: ${COLORS.SECONDARY};
	resize: none;

	&::placeholder {
		color: ${COLORS.DIVIDERSACT};
	}

	&:focus {
		border-bottom: 2px solid
			${({ length }) => (length === MAX_LENGTH ? COLORS.RED : COLORS.ACCENT)};
		color: ${COLORS.SECONDARY};
	}
`;

export default function Input({ placeholder, type, onChange }: InputProps) {
	const [length, setLength] = useState(0);

	if (type === 'textarea') {
		return (
			<TextareaWrapper>
				<CustomTextarea
					length={length}
					onChange={(e) => {
						setLength(e.target.value.length);
						onChange?.(e);
					}}
					maxLength={MAX_LENGTH}
					placeholder={placeholder}
				/>
				<Typography variant={'SMALL'} color={'SECONDARY'}>
					{length} / {MAX_LENGTH}
				</Typography>
			</TextareaWrapper>
		);
	} else {
		return <CustomInput onChange={onChange} placeholder={placeholder} />;
	}
}
