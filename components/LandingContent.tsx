'use client'

import Logo from "./Logo";
import luide from '../public/luide.jpg';
import Image from "next/image";

const LandingContent = () => {
  return (
    <div className='flex flex-col items-center gap-5 bg-black text-white my-5'>
      <div className="flex items-center justify-between">
        <Logo width={450} height={450} />

        <div className="flex flex-col gap-3 w-1/2 max-w-[500px]">
          <p className="font-bold text-2xl">ACESSE MAIS DE 50 AULAS</p>
          <p className="text-lg">O Formando Creators é uma formação contínua em conteúdo. Aprenda sobre redes sociais, algorimots, monetização e vendas!</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Image src={luide} alt="Luide" width={300} height={300} />

        <div className='flex flex-col gap-3 w-1/2 max-w-[500px]'>
          <p className="font-bold text-6xl">LUIDE MATOS</p>
          <p className="text-lg">Creator há 16 anos.</p>
          <p className="text-lg">Trabalho de forma ininterrupta desde então. Blogs, newsletters, lives, podcasts e Youtube. Escrevo, gravo e apresento.</p>
          <p className="text-lg">Comigo você aprende conteúdo de verdade.</p>
          <p className="text-lg">Dúvidas? Acesse minhas redes.</p>
        </div>
      </div>
    </div>
  )
}

export default LandingContent
