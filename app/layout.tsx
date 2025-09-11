import { ClerkProvider } from "@/components/providers/clerk-provider";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Plausible from "@/components/plausible-analytics";
import { brand } from "@/lib/constants/brand";
import LenisWrapper from "@/components/lenis-wrapper";
import ConvexClientProvider from "@/components/providers/convex-client-provider";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: brand.name,
  description: brand.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <html lang="en" className="h-full" suppressHydrationWarning>
          <head>
            <Plausible />
          </head>
          <body className={`${interSans.variable} antialiased`}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <LenisWrapper>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main id="content" className="flex-1 flex pt-16">
                    {children}
                  </main>
                </div>
              </LenisWrapper>
            </ThemeProvider>
          </body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
