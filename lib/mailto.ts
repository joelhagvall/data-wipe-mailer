export type RecipientMode = 'to' | 'bcc';

export class MailtoHelper {
  private static normalizeNewlines(text: string): string {
    // Ensure CRLF for best compatibility across mail clients
    return text.replace(/\r?\n/g, "\r\n");
  }

  static buildMailtoUrl(
    recipients: string | string[],
    subject: string,
    body: string,
    mode: RecipientMode = 'bcc'
  ): string {
    const list = Array.isArray(recipients) ? recipients : [recipients];
    const cleaned = Array.from(new Set(list.map((x) => x.trim()).filter(Boolean)));
    const encodedList = cleaned.map((addr) => encodeURIComponent(addr)).join(",");

    const toPart = mode === 'to' ? encodedList : '';

    const normalizedBody = this.normalizeNewlines(body);
    const bccPart = mode === 'bcc' && encodedList ? `&bcc=${encodedList}` : '';
    const query = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(normalizedBody)}${bccPart}`;
    return `mailto:${toPart}?${query}`;
  }

  static openInMailApp(
    recipients: string | string[],
    subject: string,
    body: string,
    mode: RecipientMode = 'bcc'
  ): void {
    const link = this.buildMailtoUrl(recipients, subject, body, mode);
    window.location.href = link;
  }
}
