'use client'

import { Progress } from '../components/ui/progress';
import { Button } from "@/components/ui/button";
import { useUserProgress } from "../context/ProgressContext";
import { useEffect, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Iframe from 'react-iframe';
import YoutubePlayer from '../components/YoutubePlayer';

export default function Home() {
  const { user } = useUser();
  const { progress, setProgress } = useUserProgress();
  const playerRefs = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(0), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = (index: number) => {
    
  };
  

  return (
    <div className="p-5 text-center flex flex-col gap-10 items-center">
      <h1 className='text-5xl font-bold'>Olá, {user?.firstName}!</h1>

      <div className="flex flex-col gap-3 w-full items-center">
        <p className="text-2xl font-bold">Esse é o seu progresso no curso</p>
        <Progress value={progress} className="w-[60%]" />
      </div>

      <Carousel >
        <CarouselContent className='max-w-[800px]' >
          {[1, 2, 3].map((_, index) => (
            <CarouselItem key={index} className='flex justify-center items-center'>
              {/* <Iframe
                url="https://www.youtube.com/embed/9bZkp7q19f0"
                width="480px"
                height="240px"
                id=""
                className=""
                display="block"
                position="relative"
              /> */}
              <YoutubePlayer />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Button variant={'purple'}>Continuar de onde parei</Button>
    </div>
  );
}
