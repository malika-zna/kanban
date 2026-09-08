import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TugasProvider from "@/components/util/tugasProvider";
import ModalProvider from "@/components/util/modalProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kanbanz",
  description: "Mini board kanban",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col [&_input]:border [&_input]:rounded-lg [&_input]:p-2 [&_input]:px-3">
        <ModalProvider>
          <TugasProvider>
            {children}
          </TugasProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
