import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('should merge class names', () => {
    const result = cn('foo', 'bar');
    expect(result).toBe('foo bar');
  });

  it('should handle conditional classes', () => {
    const result = cn('base', true && 'included', false && 'excluded');
    expect(result).toBe('base included');
  });

  it('should merge Tailwind classes correctly', () => {
    // Later class should override earlier conflicting class
    const result = cn('p-4', 'p-2');
    expect(result).toBe('p-2');
  });

  it('should handle arrays of classes', () => {
    const result = cn(['foo', 'bar'], 'baz');
    expect(result).toBe('foo bar baz');
  });

  it('should handle objects with boolean values', () => {
    const result = cn({
      'class-a': true,
      'class-b': false,
      'class-c': true,
    });
    expect(result).toBe('class-a class-c');
  });

  it('should handle empty inputs', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('should handle undefined and null', () => {
    const result = cn('valid', undefined, null, 'also-valid');
    expect(result).toBe('valid also-valid');
  });

  it('should merge complex Tailwind utilities', () => {
    const result = cn(
      'bg-red-500 hover:bg-red-600',
      'bg-blue-500' // Should override bg-red-500 but not hover:bg-red-600
    );
    expect(result).toContain('bg-blue-500');
    expect(result).toContain('hover:bg-red-600');
    expect(result).not.toContain('bg-red-500');
  });
});
