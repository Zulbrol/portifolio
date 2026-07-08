import type { Metadata } from 'next';
import { League_Spartan, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Cursor from '@/components/Cursor';

// Importação oficial e otimizada das fontes do projeto
const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  variable: '--font-spartan',
  weight: ['300', '400', '500', '700', '800'],
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Zulbrol | Portfolio',
  description: 'High-End Video Editing & Motion Design',
   verification: {
    google: '_KqhTn_27d8r77xiSkGOUedL3nLzla9HFDhJq-gRmhHw',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" style={{ scrollBehavior: 'smooth' }}>
      <body 
        className={`${leagueSpartan.variable} ${plusJakartaSans.variable} antialiased`}
        style={{ backgroundColor: '#000000', margin: 0, padding: 0 }}
      >
        <Cursor />
        {children}
      </body>
    </html>
  );
}
