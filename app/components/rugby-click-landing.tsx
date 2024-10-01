"use client"

import Image from "next/image"

import LatestNews from "./latest-news"
import LatestYouTubeVideo from "./latest-youtube-video"
import LatestInstagramPost from "./latest-instagram-post"
import Header from "./header"

import eventPhotos from "./utils/event-photos"
import sponsorLogos from "./utils/sponsor-logos"
import poppins from "./utils/fonts/font"
import anton from "./utils/fonts/font-anton"
import colors from "./utils/colors"

import Card from "./ui/card" 
import CardContent from "./ui/card-content"
import AutoCarousel from "./ui/auto-carrousel"

export default function RugbyClickLanding() {
    return (
    <div className="hide-scrollbar min-h-screen bg-gray-100" style={{ backgroundColor: colors.huesoRugbyClick }}>
    <Header />
      <main className={`${anton.className} container mx-auto mt-8 space-y-12`}>  
                                {/* NO SE CENTRABA LA MIERDA ESTA LOCO QUE BRONCA */}
        <section className="text-center items-center justify-center">
          <h1 className="text-4xl font-bold mb-4 text-center" style={{ color: colors.navyBlue }}>EVENTOS DESTACADOS</h1>
          <Card className="text-center items-center justify-center">
            <CardContent className="p-0">
              <AutoCarousel
                items={eventPhotos.map((photo, index) => (
                  <div key={index} className="flex justify-center items-center">
                    <Image
                      src={photo}
                      alt={`Evento ${index + 1}`}
                      width={1600}
                      height={800}
                      className="object-cover"
                    />
                  </div>
                ))}
              />
            </CardContent>
          </Card>
        </section>
        <section>
          <div>
            <h2 className="text-center text-4xl font-bold" style={{ color: colors.navyBlue }}>ÚLTIMAS NOTICIAS</h2>
            <Card>
              <CardContent className="relative">
                <LatestNews />
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.navyBlue }}> ÚLTIMO VIDEO DE YOUTUBE</h2>
            <Card>
              <CardContent className="aspect-video">
                <LatestYouTubeVideo />
              </CardContent>
            </Card>
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.navyBlue }}> ÚLTIMA PUBLICACIÓN DE INSTAGRAM</h2>
            <Card>
              <CardContent className="aspect-square relative">
                <LatestInstagramPost />
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section>
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.navyBlue }}> NOS ACOMPAÑAN EN LA DIFUSIÓN DEL RUGBY</h2>
            <Card>
                <CardContent className="p-4">
                <AutoCarousel
                items={sponsorLogos.map((logo, index) => (
                    <Image
                    key={index}
                    src={logo}
                    alt={`Sponsor ${index + 1}`}
                    width={200}
                    height={100}
                    className="object-contain"
                    />
                ))}
                />
            </CardContent>
            </Card>
        </section>
      </main>

      <footer style={{ backgroundColor: colors.navyBlue }} className={`${poppins.className} text-white mt-12 py-8`}>
        <div className="container mx-auto text-center">
            <p className="text-lg font-semibold mb-2">&copy; 2024 RugbyClick. Todos los derechos reservados.</p>
            <p className="text-sm">
                Desarrollado por{" "}
            <a
                href="https://franciscopfeiffer.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="frn hover:underline transition-colors duration-300"
                >
                frn 
            </a>
            🦀
            </p>
        </div>
      </footer>
    </div>
  )
}

