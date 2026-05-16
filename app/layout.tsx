import './globals.css';
import Cursor from '@/components/Cursor';

export const metadata = {
  title: 'Zulbrol | Portfolio',
  description: 'High-End Video Editing & Motion Design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="antialiased" style={{ backgroundColor: '#000000' }}>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
