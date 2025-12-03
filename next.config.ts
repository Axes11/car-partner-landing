import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['fsjivvyugigwtlshjxld.supabase.co'],
	},
	compiler: {
		styledComponents: true,
	},
};

export default nextConfig;
