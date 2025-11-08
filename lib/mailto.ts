export class MailtoHelper {
  private static normalizeNewlines(text: string): string {
    // Ensure CRLF for best compatibility across mail clients
    return text.replace(/\r?\n/g, "\r\n");
  }

  static buildMailtoUrl(recipients: string | string[], subject: string, body: string): string {
    const list = Array.isArray(recipients) ? recipients : [recipients];
    const cleaned = Array.from(new Set(list.map((x) => x.trim()).filter(Boolean)));
    const toPart = cleaned.map((addr) => encodeURIComponent(addr)).join(",");

    const normalizedBody = this.normalizeNewlines(body);
    const query = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(normalizedBody)}`;
    return `mailto:${toPart}?${query}`;
  }

  static openInMailApp(recipients: string | string[], subject: string, body: string): void {
    const link = this.buildMailtoUrl(recipients, subject, body);
    window.location.href = link;
  }
}
