import { LRUCache } from 'lru-cache';

interface RateLimitOptions {
  windowMs: number;
  keyPrefix?: string;
  message?: string;
}

const rateLimit = (options: RateLimitOptions) => {
  const tokenCache = new LRUCache({
    max: 500,            
    ttl: options.windowMs 
  });

  return (req: Request) => {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const endpointKey = `${options.keyPrefix || 'rl'}:${ip}`;

    if (tokenCache.has(endpointKey)) {
      return false;
    }

    tokenCache.set(endpointKey, Date.now());
    return true;
  };
};

export default rateLimit;