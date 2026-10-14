import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'TOWLE. — Make Your Beach Day Better.',
  description: 'A multifunctional beach towel rental service designed for comfort, convenience, and slow coastal living in Bali.',
  openGraph: {
    title: 'TOWLE. — Make Your Beach Day Better.',
    description: 'A multifunctional beach towel rental service designed for comfort, convenience, and slow coastal living in Bali.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TOWLE. — Make Your Beach Day Better.',
    description: 'A multifunctional beach towel rental service designed for comfort, convenience, and slow coastal living in Bali.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-surface text-on-surface antialiased font-body-md selection:bg-secondary-container selection:text-on-secondary-container min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
