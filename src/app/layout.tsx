import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#059669',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'MicroLab OS — Microbiology Laboratory Assistant & AI Platform',
  description: 'Comprehensive benchtop microbiology assistant for BSc, MSc, and PhD practicals, AI colony vision counting, smart calculators, machinery SOPs, and error diagnostics.',
  keywords: ['microbiology', 'laboratory practicals', 'CFU counter', 'colony counter', 'BSc microbiology', 'MSc microbiology', 'growth kinetics', 'Gram stain', 'Kirby Bauer']
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">{children}</body>
    </html>
  );
}
