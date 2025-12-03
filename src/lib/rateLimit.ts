import { LRUCache } from 'lru-cache';

interface RateLimitOptions {
	windowMs: number;
	keyPrefix?: string;
	message?: string;
}

export const createRateLimiter = (options: RateLimitOptions) => {
	const tokenCache = new LRUCache<string, number>({
		max: 500,
		ttl: options.windowMs,
	});

	const check = (req: Request) => {
		const ip = req.headers.get('x-forwarded-for') || 'unknown';
		const endpointKey = `${options.keyPrefix || 'rl'}:${ip}`;

		return !tokenCache.has(endpointKey);
	};

	const update = (req: Request) => {
		const ip = req.headers.get('x-forwarded-for') || 'unknown';
		const endpointKey = `${options.keyPrefix || 'rl'}:${ip}`;

		tokenCache.set(endpointKey, Date.now());
		return true;
	};

	return { check, update };
};
