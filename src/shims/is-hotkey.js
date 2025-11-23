// Minimal ESM-friendly implementation based on the MIT-licensed `is-hotkey` package.

const IS_MAC = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

const MODIFIERS = {
	alt: 'altKey',
	control: 'ctrlKey',
	meta: 'metaKey',
	shift: 'shiftKey'
};

const ALIASES = {
	add: '+',
	break: 'pause',
	cmd: 'meta',
	command: 'meta',
	ctl: 'control',
	ctrl: 'control',
	del: 'delete',
	down: 'arrowdown',
	esc: 'escape',
	ins: 'insert',
	left: 'arrowleft',
	mod: IS_MAC ? 'meta' : 'control',
	opt: 'alt',
	option: 'alt',
	return: 'enter',
	right: 'arrowright',
	space: ' ',
	spacebar: ' ',
	up: 'arrowup',
	win: 'meta',
	windows: 'meta'
};

const CODES = {
	backspace: 8,
	tab: 9,
	enter: 13,
	shift: 16,
	control: 17,
	alt: 18,
	pause: 19,
	capslock: 20,
	escape: 27,
	' ': 32,
	pageup: 33,
	pagedown: 34,
	end: 35,
	home: 36,
	arrowleft: 37,
	arrowup: 38,
	arrowright: 39,
	arrowdown: 40,
	insert: 45,
	delete: 46,
	meta: 91,
	numlock: 144,
	scrolllock: 145,
	';': 186,
	'=': 187,
	',': 188,
	'-': 189,
	'.': 190,
	'/': 191,
	'`': 192,
	'[': 219,
	'\\': 220,
	']': 221,
	"'": 222
};

for (let f = 1; f < 20; f += 1) {
	CODES[`f${f}`] = 111 + f;
}

export function isHotkey(hotkey, options, event) {
	if (options && !('byKey' in options)) {
		event = options;
		options = undefined;
	}
	const hotkeysArray = Array.isArray(hotkey) ? hotkey : [hotkey];
	const matchers = hotkeysArray.map((string) => parseHotkey(string, options));
	const checker = (e) => matchers.some((object) => compareHotkey(object, e));
	return event ? checker(event) : checker;
}

export function isCodeHotkey(hotkey, event) {
	return isHotkey(hotkey, event);
}

export function isKeyHotkey(hotkey, event) {
	return isHotkey(hotkey, { byKey: true }, event);
}

export function parseHotkey(hotkey, options) {
	const byKey = options && options.byKey;
	const ret = {};
	hotkey = hotkey.replace('++', '+add');
	const values = hotkey.split('+');

	for (const key in MODIFIERS) {
		ret[MODIFIERS[key]] = false;
	}

	for (const valueSegment of values) {
		let value = valueSegment;
		const optional = value.endsWith('?') && value.length > 1;
		if (optional) {
			value = value.slice(0, -1);
		}
		const name = toKeyName(value);
		const modifier = MODIFIERS[name];

		if (value.length > 1 && !modifier && !ALIASES[value] && !CODES[name]) {
			throw new TypeError(`Unknown modifier: "${value}"`);
		}

		if (values.length === 1 || !modifier) {
			if (byKey) {
				ret.key = name;
			} else {
				ret.which = toKeyCode(value);
			}
		}

		if (modifier) {
			ret[modifier] = optional ? null : true;
		}
	}

	return ret;
}

export function compareHotkey(object, event) {
	for (const key in object) {
		const expected = object[key];
		if (expected == null) continue;

		let actual;
		if (key === 'key' && event.key != null) {
			actual = event.key.toLowerCase();
		} else if (key === 'which') {
			actual = expected === 91 && event.which === 93 ? 91 : event.which;
		} else {
			actual = event[key];
		}

		if (actual == null && expected === false) {
			continue;
		}
		if (actual !== expected) {
			return false;
		}
	}
	return true;
}

export function toKeyCode(name) {
	const normalised = toKeyName(name);
	return CODES[normalised] || normalised.toUpperCase().charCodeAt(0);
}

export function toKeyName(name) {
	const lower = name.toLowerCase();
	return ALIASES[lower] || lower;
}

export default isHotkey;
