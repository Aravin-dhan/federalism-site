import { useMemo, useCallback } from 'react';
import { useSyncExternalStore } from './use-sync-external-store.js';

class ToastTimer {
	constructor(callback, delay) {
		this.callback = callback;
		this.remaining = delay;
		this.timerId = null;
		this.startTime = null;
	}

	reset(delay) {
		this.remaining = delay;
		this.resume();
	}

	pause() {
		if (this.timerId == null) return;
		clearTimeout(this.timerId);
		this.timerId = null;
		this.remaining -= Date.now() - this.startTime;
	}

	resume() {
		if (this.remaining <= 0) return;
		this.startTime = Date.now();
		this.timerId = setTimeout(() => {
			this.timerId = null;
			this.remaining = 0;
			this.callback();
		}, this.remaining);
	}
}

export class ToastQueue {
	constructor(options = {}) {
		this.queue = [];
		this.subscriptions = new Set();
		this.visibleToasts = [];
		this.maxVisibleToasts = options.maxVisibleToasts ?? Infinity;
		this.wrapUpdate = options.wrapUpdate;
	}

	runWithWrapUpdate(fn, action) {
		if (typeof this.wrapUpdate === 'function') {
			this.wrapUpdate(fn, action);
		} else {
			fn();
		}
	}

	subscribe(fn) {
		this.subscriptions.add(fn);
		return () => this.subscriptions.delete(fn);
	}

	add(content, options = {}) {
		const toastKey = `_${Math.random().toString(36).slice(2)}`;
		const toast = {
			...options,
			content,
			key: toastKey,
			timer: options.timeout ? new ToastTimer(() => this.close(toastKey), options.timeout) : undefined
		};
		this.queue.unshift(toast);
		this.updateVisibleToasts('add');
		return toastKey;
	}

	close(key) {
		const index = this.queue.findIndex((toast) => toast.key === key);
		if (index >= 0) {
			const toast = this.queue[index];
			toast.onClose?.call(toast);
			this.queue.splice(index, 1);
		}
		this.updateVisibleToasts('remove');
	}

	pauseAll() {
		for (const toast of this.visibleToasts) {
			toast.timer?.pause();
		}
	}

	resumeAll() {
		for (const toast of this.visibleToasts) {
			toast.timer?.resume();
		}
	}

	clear() {
		this.queue = [];
		this.updateVisibleToasts('clear');
	}

	updateVisibleToasts(action) {
		this.visibleToasts = this.queue.slice(0, this.maxVisibleToasts);
		this.runWithWrapUpdate(() => {
			for (const fn of this.subscriptions) {
				fn();
			}
		}, action);
	}
}

export function useToastQueue(queue) {
	const subscribe = useCallback((fn) => queue.subscribe(fn), [queue]);
	const getSnapshot = useCallback(() => queue.visibleToasts, [queue]);
	const visibleToasts = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
	return {
		visibleToasts,
		add: (content, options) => queue.add(content, options),
		close: (key) => queue.close(key),
		pauseAll: () => queue.pauseAll(),
		resumeAll: () => queue.resumeAll()
	};
}

export function useToastState(props = {}) {
	const { maxVisibleToasts = 1, wrapUpdate } = props;
	const queue = useMemo(
		() =>
			new ToastQueue({
				maxVisibleToasts,
				wrapUpdate
			}),
		[maxVisibleToasts, wrapUpdate]
	);
	return useToastQueue(queue);
}
