import "./globals.css";
import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import { ReduxProvider } from "@/store/provider";
import { Navbar } from "@/components/layouts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inconsolata = Inconsolata({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://lemon-ts.vercel.app/"),
  title: {
    default: "Lemon Code🍋",
    template: `%s | Lemon Code🍋`,
  },
  description: "This is the description of Lemon Code🍋",
  verification: {
    google: "google-site-verification=878787878",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://lemon-ts.vercel.app/",
    title: "Lemon Code🍋",
    description: "This is the description of Lemon Code🍋",
    images: [
      {
        url: "https://lemon-ts.vercel.app/og-image.jpg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inconsolata.className}>
        <ReduxProvider>
          <div>
            <Navbar />
            {children}
          </div>
          <ToastContainer theme="dark" />
        </ReduxProvider>
      </body>
    </html>
  );
}
