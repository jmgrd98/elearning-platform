'use client'

import logo from '../public/formando_creators_grande_2_copiar.png';
import Image from 'next/image';

 interface LogoProps {
    width: number,
    height: number
 }
const Logo = ({ width, height}: LogoProps) => {
  return <Image src={logo} alt="Logo" width={width} height={height} />
}

export default Logo
