import type { Metadata } from "next";
import "./globals.css";
import { MLProvider } from "@/lib/MLContext";

export const metadata: Metadata = {
  title: "PRITHVEX – AI Supply Chain Intelligence",
  description: "AI-powered supply chain forecasting and risk intelligence platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MLProvider>{children}</MLProvider>
      </body>
    </html>
  );
}