import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AnalyticsWrapper } from "@/components/analytics-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Data Wipe Mailer - Protect Your Digital Privacy",
  description: "Your digital privacy is valuable - exercise your right to delete personal data before it falls into the wrong hands.",
  keywords: ["data privacy", "GDPR", "personal data deletion", "digital privacy", "data protection", "privacy rights", "Sweden"],
  authors: [{ name: "Data Wipe Mailer" }],
  metadataBase: new URL('https://data-wipe-mailer.vercel.app'),
  openGraph: {
    title: "Data Wipe Mailer - Protect Your Digital Privacy",
    description: "Your digital privacy is valuable - exercise your right to delete personal data before it falls into the wrong hands.",
    url: 'https://data-wipe-mailer.vercel.app',
    siteName: 'Data Wipe Mailer',
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Data Wipe Mailer - Protect Your Digital Privacy",
    description: "Your digital privacy is valuable - exercise your right to delete personal data before it falls into the wrong hands.",
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
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
