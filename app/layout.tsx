import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";
import { AudioProvider } from "@/components/AudioProvider";
import AudioToggle from "@/components/AudioToggle";

export const metadata = {
  title: "SPINJITZUMASTER.guru",
  description: "Join the dojo and help unlock the full platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans">
        <AudioProvider>
          <header className="flex items-center justify-between p-4 bg-gray-800">
            <Link href="/" className="text-2xl font-bold hover:text-green-400">
              SPINJITZUMASTER
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/join" className="hover:text-green-400">Join</Link>
              <Link href="/videos" className="hover:text-green-400">Videos</Link>
            </nav>
            <AudioToggle />
          </header>
          <main className="flex-1">{children}</main>
          <footer className="p-4 text-xs text-center bg-gray-800 text-gray-400">
            All ‘martial arts’ content featured on this platform is fictional, staged, or parody content. Attempting anything shown in real life is likely to cause harm or injury. Do not try this yourself.
          </footer>
        </AudioProvider>
      </body>
    </html>
  );
}