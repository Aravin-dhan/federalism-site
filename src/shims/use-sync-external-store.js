import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const cjs = require('use-sync-external-store/shim/index.js');

const exported =
	cjs?.useSyncExternalStore ?? cjs?.default ?? cjs ?? (() => {
		throw new Error('use-sync-external-store shim missing exports');
	});

export const useSyncExternalStore = exported;
export default useSyncExternalStore;
