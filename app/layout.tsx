import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { JobTimerProvider } from '@/contexts/JobTimerContext';
import ActiveJobBanner from '@/components/ActiveJobBanner';
import BottomNav from '@/components/BottomNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mobile Operations Dashboard',
  description: 'Operations Dashboard for Servicemen',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen pb-24`}>
        <JobTimerProvider>
          <ActiveJobBanner />
          {children}
          <BottomNav />
        </JobTimerProvider>
      </body>
    </html>
  );
}
