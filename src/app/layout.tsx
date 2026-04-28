import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "12 Gates",
  description: "Bible study, commentary, studies, and resources.",
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/bible", label: "Bible" },
  { href: "/studies", label: "Studies" },
  { href: "/resources", label: "Resources" },
  { href: "/search", label: "Search" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-950 text-stone-100 antialiased">
        <div className="min-h-screen">
          <header className="border-b border-stone-800 bg-stone-950/95 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
              <Link href="/" className="text-lg font-semibold tracking-tight">
                12 Gates
              </Link>

              <nav className="flex flex-wrap items-center gap-4 text-sm text-stone-300">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}