'use client'

import Logo from './Logo';
import { Button } from './ui/button';
import { Montserrat } from "next/font/google";
import { useAuth } from "@clerk/nextjs";
import Link from 'next/link';


const font = Montserrat({
    weight: "600",
    subsets: ['latin']
})

const LandingHeader = () => {
    const { isSignedIn } = useAuth();

  return (
    <div className='flex items-center justify-between h-20 p-3 bg-black'>
      <Logo width={100} height={100} />

      {/* <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
            <Button variant={'secondary'} >
                Acessar
            </Button>
        </Link> */}
    </div>
  )
}

export default LandingHeader
