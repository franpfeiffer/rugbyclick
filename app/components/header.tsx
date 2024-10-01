import Image from 'next/image'

import colors from './utils/colors'

export default function Header(){
  return (
    <header 
      style={{ 
        backgroundColor: colors.azulOscuroBanner,
        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner-RNUsaQvAUYYKQ5w10jDDdi3JwmpLXK.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'right 40px center',
        backgroundRepeat: 'no-repeat'
      }} 
      className="shadow-md p-4 relative"
    >
      <div className="container mx-auto flex justify-between items-center relative z-10">
        <Image 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rugbyclicklogo-dd0FDhhPdx0vEiXJw9DQu9vxMcE1MJ.png" 
          alt="RugbyClick Logo" 
          width={200} 
          height={100} 
        />
        <nav>
        </nav>
      </div>
    </header>
  )
}
