'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * A hook for reading/writing to localStorage that avoids hydration mismatches
 * and complies with React's rules about not calling setState in effects.
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  validate?: (value: unknown) => value is T
): [T, (value: T) => void] {
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
      if (item === null) return defaultValue;
      const parsed = JSON.parse(item);
      if (validate && !validate(parsed)) return defaultValue;
      return parsed as T;
    } catch {
      return defaultValue;
    }
  }, [key, defaultValue, validate]);

  const getServerSnapshot = useCallback(() => defaultValue, [defaultValue]);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (newValue: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
        // Dispatch event so useSyncExternalStore re-renders
        window.dispatchEvent(new StorageEvent('storage', { key }));
      } catch {}
    },
    [key]
  );

  return [value, setValue];
}
