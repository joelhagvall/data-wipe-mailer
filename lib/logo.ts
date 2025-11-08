export class LogoHelper {
  static getFaviconUrl(email: string, size: number = 128): string {
    // Extract domain from email (e.g., "info@mrkoll.se" -> "mrkoll.se")
    const domain = email.split('@')[1];
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
  }
}
