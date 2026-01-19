'use client';

import { useCallback, useRef, useSyncExternalStore } from 'react';

type SetStateAction<T> = T | ((prev: T) => T);

/**
 * A hook for reading/writing to localStorage that avoids hydration mismatches
 * and complies with React's rules about not calling setState in effects.
 * Supports functional updates like useState: setValue(prev => newValue)
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  validate?: (value: unknown) => value is T
): [T, (value: SetStateAction<T>) => void] {
  // Keep a ref to the current value for functional updates
  const valueRef = useRef<T>(defaultValue);

  const subscribe = useCallback(
    (callback: () => void) => {
      const handleStorage = (e: StorageEvent) => {
        if (e.key === key || e.key === null) callback();
      };
      window.addEventListener('storage', handleStorage);
      return () => window.removeEventListener('storage', handleStorage);
    },
    [key]
  );

  const getSnapshot = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        valueRef.current = defaultValue;
        return defaultValue;
      }
      const parsed = JSON.parse(item);
      if (validate && !validate(parsed)) {
        valueRef.current = defaultValue;
        return defaultValue;
      }
      valueRef.current = parsed as T;
      return parsed as T;
    } catch {
      valueRef.current = defaultValue;
      return defaultValue;
    }
  }, [key, defaultValue, validate]);

  const getServerSnapshot = useCallback(() => defaultValue, [defaultValue]);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (action: SetStateAction<T>) => {
      try {
        const newValue = typeof action === 'function'
          ? (action as (prev: T) => T)(valueRef.current)
          : action;
        localStorage.setItem(key, JSON.stringify(newValue));
        valueRef.current = newValue;
        // Dispatch event so useSyncExternalStore re-renders
        window.dispatchEvent(new StorageEvent('storage', { key }));
      } catch {}
    },
    [key]
  );

  return [value, setValue];
}
