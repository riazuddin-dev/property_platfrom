// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StaySphere - Premium Property Rental",
  description: "Find your dream home with confidence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            success: { duration: 3000, style: { background: '#10b981', color: 'white' } },
            error: { duration: 4000, style: { background: '#ef4444', color: 'white' } },
          }}
        />
      </body>
    </html>
  );
}