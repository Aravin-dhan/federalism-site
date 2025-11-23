import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const cjs = require('is-hotkey');

const base = cjs.default ?? cjs.isHotkey ?? cjs;

export const isHotkey = base;
export const isCodeHotkey = cjs.isCodeHotkey ?? ((hotkey, event) => base(hotkey, event));
export const isKeyHotkey = cjs.isKeyHotkey ?? ((hotkey, event) => base(hotkey, { byKey: true }, event));
export const parseHotkey = cjs.parseHotkey ?? (() => {
	throw new Error('parseHotkey not available in shim');
});
export const compareHotkey = cjs.compareHotkey ?? (() => {
	throw new Error('compareHotkey not available in shim');
});
export const toKeyCode = cjs.toKeyCode ?? (() => undefined);
export const toKeyName = cjs.toKeyName ?? (() => undefined);

export default base;
