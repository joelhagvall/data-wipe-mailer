import { providers } from '@/data/providers';

describe('providers data', () => {
  it('should have at least one provider', () => {
    expect(providers.length).toBeGreaterThan(0);
  });

  it('should have unique provider ids', () => {
    const ids = providers.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have unique provider emails', () => {
    const emails = providers.map((p) => p.email);
    const uniqueEmails = new Set(emails);
    expect(uniqueEmails.size).toBe(emails.length);
  });

  it('should have valid email format for all providers', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    providers.forEach((provider) => {
      expect(provider.email).toMatch(emailRegex);
    });
  });

  it('should have non-empty names for all providers', () => {
    providers.forEach((provider) => {
      expect(provider.name.trim()).not.toBe('');
    });
  });

  it('should have a category for all providers', () => {
    providers.forEach((provider) => {
      expect(provider.category).toBeDefined();
      expect(provider.category.trim()).not.toBe('');
    });
  });

  describe('specific providers', () => {
    it('should include MrKoll', () => {
      const mrkoll = providers.find((p) => p.id === 'mrkoll');
      expect(mrkoll).toBeDefined();
      expect(mrkoll?.name).toBe('MrKoll');
    });

    it('should include Ratsit', () => {
      const ratsit = providers.find((p) => p.id === 'ratsit');
      expect(ratsit).toBeDefined();
      expect(ratsit?.name).toBe('Ratsit');
    });

    it('should include Hitta.se', () => {
      const hitta = providers.find((p) => p.id === 'hitta');
      expect(hitta).toBeDefined();
      expect(hitta?.name).toBe('Hitta.se');
    });
  });
});
