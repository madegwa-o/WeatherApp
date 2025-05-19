// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Weather App',
    description: 'A modern weather application built with NextJS and Laravel',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <div className="min-h-screen bg-gray-100 border-amber-600" >
            <header className="bg-primary text-white shadow-md">
                <div className="box-decoration-clone bg-linear-to-r from-indigo-600">
                    <h1 className="text-2xl font-bold">Weather App</h1>
                </div>
            </header>
            <main className="flex-1 pt-[72px]">
                {/* Content Wrapper with min-h-[80vh] */}
                <div className="min-h-[80vh] container mx-auto px-4 sm:px-6 lg:px-8 ">
                    {children}
                </div>
            </main>
        </div>
        </body>
        </html>
    );
}