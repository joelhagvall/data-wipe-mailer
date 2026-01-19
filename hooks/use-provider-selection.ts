import { useState, useMemo, useCallback } from 'react';
import { providers } from '@/data/providers';

export function useProviderSelection() {
  const [selectedProviderIds, setSelectedProviderIds] = useState<Record<string, boolean>>({});

  const handleToggle = useCallback((providerId: string, checked: boolean) => {
    setSelectedProviderIds((prev) => ({ ...prev, [providerId]: checked }));
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedProviderIds((prev) => {
      const allSelected = providers.every((p) => prev[p.id]);
      if (allSelected) {
        return {};
      }
      return providers.reduce((acc, p) => ({ ...acc, [p.id]: true }), {});
    });
  }, []);

  const allProvidersSelected = useMemo(
    () => providers.every((p) => selectedProviderIds[p.id]),
    [selectedProviderIds]
  );

  const selectedCount = useMemo(
    () => Object.values(selectedProviderIds).filter(Boolean).length,
    [selectedProviderIds]
  );

  const selectedProviders = useMemo(
    () => providers.filter((p) => selectedProviderIds[p.id]),
    [selectedProviderIds]
  );

  return {
    selectedProviderIds,
    handleToggle,
    handleSelectAll,
    allProvidersSelected,
    selectedCount,
    selectedProviders,
  };
}
