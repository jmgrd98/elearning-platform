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
import axios from 'axios';
import YouTube from 'react-youtube';

export default function Home() {
  const { user } = useUser();
  const { progress, setProgress } = useUserProgress();
  const [videoIds, setVideoIds] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(0), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=luide%20comunismo&key=${process.env.YOUTUBE_API_KEY}`);
        const videoIds = response.data.items.map((item: any) => item.id.videoId);
        setVideoIds(videoIds);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleVideoEnd = () => {
    setProgress(100);
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
          {videoIds.map((videoId, index) => (
            <CarouselItem key={index} className='flex justify-center items-center'>
              <YouTube 
                videoId={videoId}
                onEnd={handleVideoEnd}
                opts={{height: "240", width: "480", playerVars: { autoplay: 1 }}}
                title={`Video ${index}`}
              />
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
