import type { Metadata } from "next";
import "../styles/fonts.scss";
import "../styles/globals.scss";

export const metadata: Metadata = {
  title: "PetVerse", // Set your website name here
  description: "PetVerse the best Dashboard",
  icons: {
    icon: '/favicon.ico', // Link to your favicon file
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>PetVerse</title>
      </head>
      <body className="font-twitter-chirp">
        {children}
      </body>
    </html>
  );
}
