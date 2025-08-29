// app/layout.js
import "./globals.css";
import Shell from "@/components/layout/Shell";

export const metadata = {
  title: "Admin Panel",
  description: "Admin dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
