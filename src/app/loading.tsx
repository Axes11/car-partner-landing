'use client';

import Logo from '@/shared/ui/Logo';

export default function Loading() {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				transform: 'translateY(40vh)',
			}}>
			<Logo />
		</div>
	);
}
