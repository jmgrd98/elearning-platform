'use client'

import logo from '../public/formando_creators_grande_2_copiar.png';
import Image from 'next/image';

const LandingContent = () => {
  return (
    <div className='flex flex-col gap-5 bg-black'>
      <Image src={logo} alt="Logo" width={450} height={450} />
    </div>
  )
}

export default LandingContent
