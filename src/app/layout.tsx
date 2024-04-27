import type { Metadata } from 'next';
import './globals.css';
import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';

const fontSans: NextFontWithVariable = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    template: '%s - MovieNight',
    default: 'MovieNight',
  },
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="suppressHydrationWarning">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
