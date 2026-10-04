import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GhostSub — Zero-Knowledge Vampire Subscription Hunter & Dark Pattern Defeater",
  description: "Hacktoberfest 2026 entry built for Kevin. Uses TabPFN to spot sneaky price creeps and zombie debits, and Gemma-2 to generate legally binding FTC Click-to-Cancel demand notices.",
  keywords: ["Hacktoberfest", "TabPFN", "Gemma", "Render", "AI", "Open Source", "Subscriptions", "FinTech", "Privacy"],
  authors: [{ name: "Rajan Mishra" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark" suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
