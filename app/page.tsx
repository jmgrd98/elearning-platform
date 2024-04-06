'use client'

import { Progress } from '../components/ui/progress';
import { Button } from "@/components/ui/button";
import { useUserProgress } from "../context/ProgressContext";
import { useEffect, useRef, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Iframe from 'react-iframe';
import axios from 'axios';

export default function Home() {
  const { user } = useUser();
  const { progress, setProgress } = useUserProgress();
  const playerRefs = useRef([]);
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setProgress(0), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log(process.env.YOUTUBE_API_KEY)
      try {
      const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=the%20weeknd&key=${process.env.YOUTUBE_API_KEY}`);
        console.log(response.data);
        const firstVideoId = response.data.items[0].id.videoId;
        setVideoId(firstVideoId);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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
              <Iframe
                url={`https://www.youtube.com/embed/${videoId}`}
                width="480px"
                height="240px"
                id=""
                className=""
                display="block"
                position="relative"
              />
              {/* <YoutubePlayer /> */}
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
