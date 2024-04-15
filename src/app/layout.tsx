import React from "react";
import "./globals.scss";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

export const metadata = {
  title: "Verhalen website",
  description: "Verhalen website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      <Footer/>
      </body>
    </html>
  );
}
