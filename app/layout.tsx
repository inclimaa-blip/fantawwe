import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "FantaWWE",
  description: "Fantasy WWE league management app"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body>
        <div className="app-shell">
          <header className="app-header">
            <div>
              <p className="app-title">FantaWWE</p>
              <p className="app-subtitle">
                Gestionale fantasy WWE — MVP planning e tool per la stagione.
              </p>
            </div>
            <button className="primary-button" type="button">
              Accedi
            </button>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
