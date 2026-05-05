import './globals.css';

export const metadata = {
  title: 'AutoSouk Maroc',
  description: 'Plateforme automobile premium au Maroc',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
