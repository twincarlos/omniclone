import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Omniclone",
  description: "All table tennis events in USA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script src="https://kit.fontawesome.com/09c2dac4bc.js" crossOrigin="anonymous"></Script>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
