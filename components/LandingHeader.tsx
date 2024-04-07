'use client'

import Logo from './Logo';
import { Button } from './ui/button';
import { Montserrat } from "next/font/google";
import { useAuth } from "@clerk/nextjs"

const font = Montserrat({
    weight: "600",
    subsets: ['latin']
})

const LandingHeader = () => {
    const { isSignedIn } = useAuth();
  return (
    <div className='flex items-center justify-between h-20 p-3 bg-black'>
      <Logo width={100} height={100} />

      <Button variant="secondary">Acessar</Button>
    </div>
  )
}

export default LandingHeader
