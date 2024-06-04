import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "./(components)/ThemeProvider";
import { App } from "./App";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Omniclone",
  description: "All table tennis events in USA",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Script src="https://kit.fontawesome.com/09c2dac4bc.js" crossOrigin="anonymous" />
      <ThemeProvider>
        <App inter={inter} >
          {children}
        </App>
      </ThemeProvider>
    </html>
  );
}