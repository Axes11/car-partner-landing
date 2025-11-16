import styled from 'styled-components';
import Image from 'next/image';

import { useLanguage } from '@/hooks/useLanguage';

import Title from '@/shared/ui/Title';
import Container from '@/shared/ui/Container';
import Typography from '@/shared/ui/Typography';

import AboutUsImage from '@/assets/imgs/main.png';
import { useLoadingContext } from '@/shared/context/loadingContext';

const AboutUsContainer = styled(Container)`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	gap: 20px;
`;

const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 40px;
	width: 100%;
	max-width: 500px;
`;

const ImageContainer = styled.div`
	width: 100%;
	max-width: 600px;
`;

export default function AboutUsBlock() {
	const languageData = useLanguage('aboutUs');
	const ctx = useLoadingContext();

	return (
		<AboutUsContainer id={'about-us'}>
			<TextContainer>
				<Title>{languageData?.res.title}</Title>
				<Typography variant='TEXT' color='TEXT' weight='normal'>
					{languageData?.res.descriptionFirst}
				</Typography>
				<Typography variant='TEXT' color='TEXT' weight='normal'>
					{languageData?.res.descriptionSecond}
				</Typography>
			</TextContainer>
			<ImageContainer>
				<Image
					src={AboutUsImage}
					style={{ objectFit: 'contain' }}
					onLoad={() => ctx?.imageLoaded}
					onError={() => ctx?.imageLoaded}
					alt='containers'
				/>
			</ImageContainer>
		</AboutUsContainer>
	);
}
