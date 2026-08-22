import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AnalyticsWrapper } from "@/components/analytics-wrapper";
import { JsonLd } from "@/components/json-ld";
import { GITHUB_URL, SITE_NAME, SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "Data Wipe Mailer - Protect Your Digital Privacy";
const DESCRIPTION = "Your digital privacy is valuable - exercise your right to delete personal data before it falls into the wrong hands.";

export const metadata: Metadata = {
  title: { default: TITLE, template: `%s | ${SITE_NAME}` },
  description: DESCRIPTION,
  keywords: ["data privacy", "GDPR", "personal data deletion", "digital privacy", "data protection", "privacy rights", "Sweden"],
  authors: [{ name: "Data Wipe Mailer", url: GITHUB_URL }],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'sv_SE',
    alternateLocale: ['en_US'],
    type: 'website',
    images: [{ url: '/image.png', width: 1015, height: 1015, alt: 'Data Wipe Mailer logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{try{var t=localStorage.getItem('dw_theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`,
          }}
        />
        <JsonLd />
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
