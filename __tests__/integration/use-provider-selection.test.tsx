import { renderHook, act } from '@testing-library/react';
import { useProviderSelection } from '@/hooks/use-provider-selection';
import { providers } from '@/data/providers';

describe('useProviderSelection hook', () => {
  it('should initialize with no providers selected', () => {
    const { result } = renderHook(() => useProviderSelection());

    expect(result.current.selectedCount).toBe(0);
    expect(result.current.allProvidersSelected).toBe(false);
    expect(result.current.selectedProviders).toEqual([]);
  });

  it('should toggle a provider selection', () => {
    const { result } = renderHook(() => useProviderSelection());
    const firstProvider = providers[0];

    act(() => {
      result.current.handleToggle(firstProvider.id, true);
    });

    expect(result.current.selectedCount).toBe(1);
    expect(result.current.selectedProviderIds[firstProvider.id]).toBe(true);
    expect(result.current.selectedProviders).toContainEqual(firstProvider);
  });

  it('should untoggle a provider selection', () => {
    const { result } = renderHook(() => useProviderSelection());
    const firstProvider = providers[0];

    act(() => {
      result.current.handleToggle(firstProvider.id, true);
    });

    expect(result.current.selectedCount).toBe(1);

    act(() => {
      result.current.handleToggle(firstProvider.id, false);
    });

    expect(result.current.selectedCount).toBe(0);
    expect(result.current.selectedProviderIds[firstProvider.id]).toBe(false);
  });

  it('should select all providers when handleSelectAll is called', () => {
    const { result } = renderHook(() => useProviderSelection());

    act(() => {
      result.current.handleSelectAll();
    });

    expect(result.current.selectedCount).toBe(providers.length);
    expect(result.current.allProvidersSelected).toBe(true);
    expect(result.current.selectedProviders.length).toBe(providers.length);
  });

  it('should deselect all providers when handleSelectAll is called with all selected', () => {
    const { result } = renderHook(() => useProviderSelection());

    // First select all
    act(() => {
      result.current.handleSelectAll();
    });

    expect(result.current.allProvidersSelected).toBe(true);

    // Then deselect all
    act(() => {
      result.current.handleSelectAll();
    });

    expect(result.current.selectedCount).toBe(0);
    expect(result.current.allProvidersSelected).toBe(false);
  });

  it('should select all when some but not all are selected', () => {
    const { result } = renderHook(() => useProviderSelection());

    // Select first provider
    act(() => {
      result.current.handleToggle(providers[0].id, true);
    });

    expect(result.current.selectedCount).toBe(1);
    expect(result.current.allProvidersSelected).toBe(false);

    // Call select all - should select all remaining
    act(() => {
      result.current.handleSelectAll();
    });

    expect(result.current.selectedCount).toBe(providers.length);
    expect(result.current.allProvidersSelected).toBe(true);
  });

  it('should return correct selected providers list', () => {
    const { result } = renderHook(() => useProviderSelection());
    const firstTwo = [providers[0], providers[1]];

    act(() => {
      result.current.handleToggle(providers[0].id, true);
      result.current.handleToggle(providers[1].id, true);
    });

    expect(result.current.selectedProviders.length).toBe(2);
    expect(result.current.selectedProviders).toContainEqual(firstTwo[0]);
    expect(result.current.selectedProviders).toContainEqual(firstTwo[1]);
  });
});
