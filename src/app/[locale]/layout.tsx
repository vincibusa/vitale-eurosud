import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CustomerChatWidget } from "@/components/customer-chat-widget";
import { ComparisonProvider } from "@/contexts/comparison-context";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';

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

export async function generateMetadata({
	params
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params;
	const messages = await getMessages({ locale });
	
	return {
		title: (messages.metadata as any)?.title || "Vitale - Fornitura Veicoli Elettrici",
		description: (messages.metadata as any)?.description || "Leader nella fornitura di veicoli elettrici di qualità superiore.",
	};
}

export default async function LocaleLayout({
	children,
	params
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	
	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(locale as any)) {
		// notFound();
	}
	
	const messages = await getMessages({ locale });

	return (
		<div
			lang={locale}
			className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased overflow-x-hidden`}
		>
			<NextIntlClientProvider messages={messages}>
				<ComparisonProvider>
					<Header />
					<main className="min-h-screen">
						{children}
					</main>
					<Footer />
					<CustomerChatWidget />
				</ComparisonProvider>
			</NextIntlClientProvider>
		</div>
	);
}
