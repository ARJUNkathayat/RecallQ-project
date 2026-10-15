import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import GithubStarModal from "@/components/ui/GithubStarModal";

export const metadata: Metadata = {
  title: "RecallIQ — Remember More. Forget Less.",
  description: "RecallIQ predicts what you're likely to forget and turns revision into a personalized learning loop.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900 selection:bg-indigo-600 selection:text-white">
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <GithubStarModal />
      </body>
    </html>
  );
}