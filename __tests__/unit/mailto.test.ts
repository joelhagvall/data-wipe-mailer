import { MailtoHelper } from '@/lib/mailto';

describe('MailtoHelper', () => {
  describe('buildMailtoUrl', () => {
    it('should build a mailto URL with a single recipient in bcc mode', () => {
      const url = MailtoHelper.buildMailtoUrl(
        'test@example.com',
        'Test Subject',
        'Test Body',
        'bcc'
      );

      expect(url).toContain('mailto:?');
      expect(url).toContain('subject=Test%20Subject');
      expect(url).toContain('body=Test%20Body');
      expect(url).toContain('bcc=test%40example.com');
    });

    it('should build a mailto URL with multiple recipients in bcc mode', () => {
      const url = MailtoHelper.buildMailtoUrl(
        ['a@example.com', 'b@example.com'],
        'Subject',
        'Body',
        'bcc'
      );

      expect(url).toContain('bcc=a%40example.com,b%40example.com');
    });

    it('should build a mailto URL with recipients in to mode', () => {
      const url = MailtoHelper.buildMailtoUrl(
        ['a@example.com', 'b@example.com'],
        'Subject',
        'Body',
        'to'
      );

      expect(url).toMatch(/^mailto:a%40example\.com,b%40example\.com\?/);
      expect(url).not.toContain('bcc=');
    });

    it('should default to bcc mode', () => {
      const url = MailtoHelper.buildMailtoUrl(
        'test@example.com',
        'Subject',
        'Body'
      );

      expect(url).toContain('bcc=test%40example.com');
    });

    it('should deduplicate recipients', () => {
      const url = MailtoHelper.buildMailtoUrl(
        ['same@example.com', 'same@example.com', 'same@example.com'],
        'Subject',
        'Body'
      );

      // Should only appear once
      const matches = url.match(/same%40example\.com/g);
      expect(matches).toHaveLength(1);
    });

    it('should trim whitespace from recipients', () => {
      const url = MailtoHelper.buildMailtoUrl(
        ['  spaced@example.com  ', 'another@example.com'],
        'Subject',
        'Body'
      );

      expect(url).toContain('spaced%40example.com');
      expect(url).not.toContain('%20spaced');
    });

    it('should filter out empty recipients', () => {
      const url = MailtoHelper.buildMailtoUrl(
        ['valid@example.com', '', '   ', 'another@example.com'],
        'Subject',
        'Body'
      );

      expect(url).toContain('valid%40example.com');
      expect(url).toContain('another%40example.com');
    });

    it('should normalize newlines to CRLF in body', () => {
      const url = MailtoHelper.buildMailtoUrl(
        'test@example.com',
        'Subject',
        'Line1\nLine2\r\nLine3'
      );

      // CRLF is encoded as %0D%0A
      const decodedBody = decodeURIComponent(
        url.match(/body=([^&]*)/)?.[1] || ''
      );
      expect(decodedBody).toBe('Line1\r\nLine2\r\nLine3');
    });

    it('should properly encode special characters in subject and body', () => {
      const url = MailtoHelper.buildMailtoUrl(
        'test@example.com',
        'Subject with & and = symbols',
        'Body with <html> & "quotes"'
      );

      expect(url).toContain(encodeURIComponent('Subject with & and = symbols'));
      expect(url).toContain(encodeURIComponent('<html>'));
    });
  });

  describe('openInMailApp', () => {
    it('should call buildMailtoUrl with correct arguments', () => {
      // Spy on buildMailtoUrl to verify it's called correctly
      const buildSpy = jest.spyOn(MailtoHelper, 'buildMailtoUrl');

      // The actual navigation will fail in JSDOM, but we can verify buildMailtoUrl is called
      try {
        MailtoHelper.openInMailApp(
          'test@example.com',
          'Subject',
          'Body'
        );
      } catch {
        // Navigation not supported in JSDOM, but we still verify the call
      }

      expect(buildSpy).toHaveBeenCalledWith(
        'test@example.com',
        'Subject',
        'Body',
        'bcc'
      );

      buildSpy.mockRestore();
    });

    it('should use the correct recipient mode when specified', () => {
      const buildSpy = jest.spyOn(MailtoHelper, 'buildMailtoUrl');

      try {
        MailtoHelper.openInMailApp(
          'test@example.com',
          'Subject',
          'Body',
          'to'
        );
      } catch {
        // Navigation not supported in JSDOM
      }

      expect(buildSpy).toHaveBeenCalledWith(
        'test@example.com',
        'Subject',
        'Body',
        'to'
      );

      buildSpy.mockRestore();
    });
  });
});
