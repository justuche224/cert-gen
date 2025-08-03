import type {Metadata} from 'next';
import './globals.css';
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'CertMaster',
  description: 'Generate, customize, and download certificates with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased dark">
        <NextTopLoader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
