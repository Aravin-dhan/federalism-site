import { defineMiddleware } from 'astro/middleware';

const PROTECTED_PREFIXES = ['/keystatic', '/api/keystatic'];

export const onRequest = defineMiddleware(async (context, next) => {
	const url = new URL(context.request.url);
	const needsAuth = PROTECTED_PREFIXES.some(
		(prefix) => url.pathname === prefix || url.pathname.startsWith(`${prefix}/`)
	);
	if (needsAuth) {
		const username = import.meta.env.KEYSTATIC_USERNAME ?? import.meta.env.ADMIN_USERNAME;
		const password = import.meta.env.KEYSTATIC_PASSWORD ?? import.meta.env.ADMIN_PASSWORD;
		if (!username || !password) {
			return new Response('Keystatic credentials missing', { status: 500 });
		}
		const authHeader = context.request.headers.get('authorization');
		if (!authHeader?.startsWith('Basic ')) {
			return new Response('Authentication required', {
				status: 401,
				headers: { 'WWW-Authenticate': 'Basic realm="Keystatic"' }
			});
		}
		const decoded = Buffer.from(authHeader.replace('Basic ', ''), 'base64').toString();
		const [incomingUser, incomingPass] = decoded.split(':');
		if (incomingUser !== username || incomingPass !== password) {
			return new Response('Unauthorized', {
				status: 401,
				headers: { 'WWW-Authenticate': 'Basic realm="Keystatic"' }
			});
		}
	}

	return next();
});
