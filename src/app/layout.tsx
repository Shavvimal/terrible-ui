import type { Metadata, Viewport } from 'next';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { cn } from '@/lib/utils';

import '@/styles/globals.css';

/*
You should not manually add <head> tags such as <title> and <meta> to root layouts. Instead, you should use the Metadata API which automatically handles advanced requirements such as streaming and de-duplicating <head> elements. 
*/
export const metadata: Metadata = {
  authors: [
    {
      name: 'Shav Vimalendiran',
      url: 'https://shav.dev',
    },
  ],
  description: 'Experience the worst UI/UX designs inspired by r/badUIbattles, with a helpful chatbot to guide you through the intentionally frustrating experience.',
  icons: {
    shortcut: '/favicon.ico',
  },
  keywords: ['Bad UI', 'UX Design', 'UI Battles', 'Chatbot', 'User Experience', 'Interactive Design'],
  metadataBase: new URL('https://terrible-ui.vercel.app'),
  openGraph: {
    description: 'Experience the worst UI/UX designs inspired by r/badUIbattles, with a helpful chatbot to guide you through the intentionally frustrating experience.',
    images: [
      {
        alt: 'Terrible UI Battles',
        height: 1080,
        url: '/og-image.png',
        width: 1920,
      },
    ],
    locale: 'en_US',
    siteName: 'Terrible UI Battles',
    title: 'Terrible UI Battles',
    type: 'website',
    url: 'https://terrible-ui.vercel.app',
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    index: true,
  },
  title: {
    default: 'Terrible UI Battles',
    template: '%s | Terrible UI Battles',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@shavtge',
    description: 'Experience the worst UI/UX designs inspired by r/badUIbattles, with a helpful chatbot to guide you through the intentionally frustrating experience.',
    images: ['/og-image.png'],
    title: 'Terrible UI Battles',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { color: 'white', media: '(prefers-color-scheme: light)' },
    { color: 'black', media: '(prefers-color-scheme: dark)' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'max-w-screen bg-background min-h-screen font-sans antialiased ',
  
        )}
      >
          {children}
          <Analytics />
          <SpeedInsights />
          <TailwindIndicator />
      </body>
    </html>
  );
}
