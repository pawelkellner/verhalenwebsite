import React from "react";
import "./globals.scss";

export const metadata = {
  title: "Verhalen website",
  description: "Verhalen website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="container">{children}</body>
    </html>
  );
}
