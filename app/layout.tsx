export const metadata = {
  title: "Elagrade | Blog Editor",
  description: "Elagrade | Blog Editor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
