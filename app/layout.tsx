import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FantaWWE",
  description: "Fantasy WWE league management app"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
