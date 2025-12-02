import Logo from './Logo';
import { COLORS } from '@/constants/Colors';
import { useContext } from 'react';
import { LoadingContext } from '../providers/loadingProvider';

export default function Loading() {
	const loadingState = useContext(LoadingContext);

	return (
		<>
			{loadingState?.isLoading && (
				<div
					style={{
						display: 'flex',
						position: 'fixed',
						zIndex: 9999,
						justifyContent: 'center',
						alignItems: 'center',
						height: '100dvh',
						width: '100vw',
						backgroundColor: COLORS.BLACK,
					}}>
					<Logo />
				</div>
			)}
		</>
	);
}
