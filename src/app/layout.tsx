import type { Metadata } from "next";
import { Anton, Caveat_Brush, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const caveatBrush = Caveat_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-caveat-brush",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Srinath L — AI/ML & Full Stack Developer",
  description:
    "Personal portfolio of Srinath L, AI/ML & Full Stack Developer based in Chennai, India.",
};

const BUILD_MODE_INIT_SCRIPT = `(function(){try{var p=new URLSearchParams(window.location.search);var q=p.get('agents');var s=localStorage.getItem('portfolio_agents');var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var on=q==='on'?true:q==='off'?false:s==='on'?true:s==='off'?false:!r;if(on){document.documentElement.classList.add('build-mode');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${geistSans.variable} ${geistMono.variable} ${caveatBrush.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BUILD_MODE_INIT_SCRIPT }} />
      </head>
      <body className="bg-[#09090b] text-zinc-100 antialiased selection:bg-[#ff3b2f] selection:text-white">
        {children}
      </body>
    </html>
  );
}
