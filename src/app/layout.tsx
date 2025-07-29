import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Movie finder",
  description: "Simple search for finding a movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        {children}
      </body>
    </html>
  );
}
