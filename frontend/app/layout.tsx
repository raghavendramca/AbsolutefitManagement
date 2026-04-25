import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AbsoluteFit Management',
  description: 'Gym subscription and facility management platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 antialiased">
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <nav className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-6">
            <Link href="/" className="font-semibold text-lg tracking-tight text-indigo-600 hover:text-indigo-700">
              AbsoluteFit
            </Link>
            <Link href="/subscriptions" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Subscriptions
            </Link>
          </nav>
        </header>
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-gray-200 bg-white text-center text-xs text-gray-400 py-4">
          AbsoluteFit Management &copy; {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
