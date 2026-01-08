import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CustomerChatWidget } from "@/components/customer-chat-widget";
import { ComparisonProvider } from "@/contexts/comparison-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vitale - Fornitura Veicoli Elettrici",
  description: "Leader nella fornitura di veicoli elettrici di qualità superiore. Dalle biciclette ai dynamici scooter, dalle avanzate auto ai veicoli specializzati per persone con disabilità. Mobilità sostenibile e all'avanguardia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="overflow-x-hidden">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased overflow-x-hidden`}
      >
        <ComparisonProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CustomerChatWidget />
        </ComparisonProvider>
      </body>
    </html>
  );
}
