import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WIDEYE - Coffee and Bikes",
  description: "WIDEYE is the best place to find the best coffee",
  icons: {
    icon: "/favicon.ico", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 transition-colors`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="mx-auto p-4 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl">
            <Navbar />
            {children}
            <Footer />
          </div>
          <ToastContainer position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="mx-auto p-4 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl">
              <Navbar />
              {children}
              <Footer />
            </div>
            <ToastContainer position="bottom-right" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}