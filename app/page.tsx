'use client'

import { Progress } from '../components/ui/progress';
import { Button } from "@/components/ui/button";
import { useUserProgress } from "../context/ProgressContext";
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Iframe from 'react-iframe'


export default function Home() {
  const { user } = useUser();
  const { progress, setProgress } = useUserProgress();
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="p-5 text-center flex flex-col gap-10 items-center">
      <h1 className='text-5xl font-bold'>Olá, {user?.firstName}!</h1>

      <div className="flex flex-col gap-3 w-full items-center">
        <p className="text-2xl font-bold">Esse é o seu progesso no curso</p>
        <Progress value={progress} className="w-[60%]" />
      </div>

      <Carousel >
        <CarouselContent className='max-w-[800px]' >
          <CarouselItem className=' flex justify-center items-center'>
              <Iframe
            url="https://www.youtube.com/embed?v=tPcUszOmU24"
            width="480px"
            height="240px"
            id=""
            className=""
            display="block"
            position="relative"
          />
          </CarouselItem>
          <CarouselItem className=' flex justify-center items-center'>
          <Iframe
            url="https://www.youtube.com/embed?v=tPcUszOmU24"
            width="480px"
            height="240px"
            id=""
            className=""
            display="block"
            position="relative"
          />
          </CarouselItem>
          <CarouselItem className=' flex justify-center items-center'>
          <Iframe
            url="https://www.youtube.com/embed?v=tPcUszOmU24"
            width="480px"
            height="240px"
            id=""
            className=""
            display="block"
            position="relative"
          />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Button variant={'purple'}>Continuar de onde parei</Button>
    </div>
  );
}
