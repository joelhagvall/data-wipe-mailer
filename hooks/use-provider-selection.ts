import { useState, useMemo } from 'react';
import { providers } from '@/data/providers';

export function useProviderSelection() {
  const [selectedProviderIds, setSelectedProviderIds] = useState<Record<string, boolean>>({});

  const handleToggle = (providerId: string, checked: boolean) => {
    setSelectedProviderIds((prev) => ({ ...prev, [providerId]: checked }));
  };

  const handleSelectAll = () => {
    const allSelected = providers.every((p) => selectedProviderIds[p.id]);
    if (allSelected) {
      setSelectedProviderIds({});
    } else {
      const allIds = providers.reduce((acc, p) => ({ ...acc, [p.id]: true }), {});
      setSelectedProviderIds(allIds);
    }
  };

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
