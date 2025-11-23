import {
	useSyncExternalStore as reactUseSyncExternalStore,
	useState,
	useEffect,
	useLayoutEffect,
	useDebugValue
} from 'react';

const objectIs =
	typeof Object.is === 'function'
		? Object.is
		: (x, y) => (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y);

function subscribeToStore(subscribe, snapshot, setSnapshot, getSnapshot) {
	const checkForUpdates = () => {
		const nextValue = getSnapshot();
		if (!objectIs(snapshot.value, nextValue)) {
			setSnapshot({
				value: nextValue,
				getSnapshot
			});
		}
	};

	const unsubscribe = subscribe(checkForUpdates);
	checkForUpdates();
	return () => {
		if (typeof unsubscribe === 'function') {
			unsubscribe();
		}
	};
}

function clientShim(subscribe, getSnapshot, getServerSnapshot) {
	const value = getSnapshot();
	const [snapshot, setSnapshot] = useState({
		value,
		getSnapshot
	});

	const latestGetSnapshot = snapshot.getSnapshot;

	useLayoutEffect(() => {
		snapshot.value = value;
		snapshot.getSnapshot = getSnapshot;
	}, [value, getSnapshot, snapshot]);

	useEffect(() => subscribeToStore(subscribe, snapshot, setSnapshot, getSnapshot), [
		subscribe,
		snapshot,
		getSnapshot
	]);

	useDebugValue(value);

	if (typeof getServerSnapshot === 'function') {
		const serverValue = getServerSnapshot();
		if (!objectIs(serverValue, value)) {
			setSnapshot({
				value,
				getSnapshot
			});
		}
	}

	return value;
}

function serverShim(_subscribe, getSnapshot) {
	return getSnapshot();
}

const canUseDOM =
	typeof window !== 'undefined' &&
	typeof window.document !== 'undefined' &&
	typeof window.document.createElement !== 'undefined';

const shimImplementation = canUseDOM ? clientShim : serverShim;

export function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
	const getServer = getServerSnapshot ?? getSnapshot;
	if (typeof reactUseSyncExternalStore === 'function') {
		return reactUseSyncExternalStore(subscribe, getSnapshot, getServer);
	}
	return shimImplementation(subscribe, getSnapshot, getServer);
}

export default useSyncExternalStore;
