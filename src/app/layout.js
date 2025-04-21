import "./globals.scss";
import { PhoneProvider } from "@/context/PhoneContext";
import { CartProvider } from "@/context/CartContext";
import { QueryProvider } from "@/providers/QueryProvider";
import Header from '@/components/layout/Header/Header';
import ErrorBoundary from "@/components/common/ErrorBoundary/ErrorBoundary";

export const metadata = {
  title: "Mobile Phone Catalog App",
  description: "Mobile Phone Catalog App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <QueryProvider>
            <PhoneProvider>
              <CartProvider>
                <Header />
                <main>
                  {children}
                </main>
              </CartProvider>
            </PhoneProvider>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
