import './globals.css';

export const metadata = {
  title: 'تطبيق الأمير',
  description: 'مجتمع الصوت والترفيه الملكي',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-slate-950 text-white font-sans">{children}</body>
    </html>
  );
}
