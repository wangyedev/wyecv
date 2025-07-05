import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { ReactNode } from "react";
import StructuredData from "@/components/StructuredData";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://wyecv.uk"),
  title:
    "Wang Ye - Senior Software Engineer at Red Hat | AI & Full Stack Developer",
  description:
    "Senior Software Engineer at Red Hat with 5+ years experience building AI-powered applications, MCP integrations, and LLM solutions. Expert in React, Next.js, TypeScript, and modern web technologies.",
  alternates: {
    canonical: "https://wyecv.uk",
  },
  keywords: [
    "Wang Ye",
    "Senior Software Engineer",
    "Red Hat",
    "Full Stack Developer",
    "AI Agent Development",
    "MCP Model Context Protocol",
    "LLM Applications",
    "React Developer",
    "Next.js Expert",
    "TypeScript",
    "Frontend Engineering",
    "Backend Development",
    "Web Development",
    "Software Engineering",
  ],
  authors: [{ name: "Wang Ye" }],
  creator: "Wang Ye",
  publisher: "Wang Ye",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wyecv.uk",
    siteName: "Wang Ye - Portfolio",
    title:
      "Wang Ye - Senior Software Engineer at Red Hat | AI & Full Stack Developer",
    description:
      "Senior Software Engineer at Red Hat with 5+ years experience building AI-powered applications, MCP integrations, and LLM solutions.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wang Ye - Senior Software Engineer at Red Hat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wang Ye - Senior Software Engineer at Red Hat",
    description:
      "Senior Software Engineer at Red Hat building AI-powered applications and LLM solutions.",
    images: ["/og-image.jpg"],
    creator: "@wangyedev",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://www.redhat.com" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <StructuredData />
      </head>
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
