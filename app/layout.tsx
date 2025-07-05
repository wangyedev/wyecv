import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wang Ye - Full Stack Developer",
  description:
    "Senior Software Engineer at Red Hat with 5 years of full-stack development experience, specializing in AI-powered applications.",
  keywords: [
    "Full Stack Developer",
    "AI Agent",
    "MCP",
    "LLM Applications",
    "React",
    "Next.js",
    "TypeScript",
    "Frontend",
  ],
  authors: [{ name: "Wang Ye" }],
  viewport: "width=device-width, initial-scale=1",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
