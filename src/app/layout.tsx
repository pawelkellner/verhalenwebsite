import React from "react";
import "./globals.scss";
import Navigation from "../components/navigation/navigation";

export const metadata = {
  title: "Verhalen website",
  description: "Verhalen website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
