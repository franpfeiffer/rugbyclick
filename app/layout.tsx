import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "RugbyClick",
  description: "RugbyClick es la plataforma líder para los apasionados del rugby, diseñada para ofrecerte la mejor información, análisis y recursos del deporte. Con noticias actualizadas, análisis de partidos, entrevistas con jugadores y entrenadores, y una comunidad vibrante de aficionados, RugbyClick es el lugar perfecto para estar al día con todo lo que sucede en el mundo del rugby. Ya seas un jugador, un entrenador o simplemente un aficionado, aquí encontrarás contenido relevante que te ayudará a mejorar tu juego y disfrutar aún más de tu pasión. ¡Únete a nuestra comunidad y vive el rugby al máximo!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
