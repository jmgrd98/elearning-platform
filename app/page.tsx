'use client'

import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import Image from "next/image";
import TypewriterComponent from 'typewriter-effect';
import { Button } from "@/components/ui/button";
import logo from '../public/formando_creators_grande_2_copiar.png';
import YouTube from 'react-youtube';
import { useState, useEffect } from "react";
import axios from "axios";


const page = () => {
    const { isSignedIn } = useAuth();

    const [videoId, setVideoId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=luide%20comunismo&key=${process.env.YOUTUBE_API_KEY}`);
            const videoId = response.data.items[0].id.videoId;
            setVideoId(videoId);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);
    
  return (
    <div className="flex flex-col items-center justify-center gap-5 h-screen bg-black text-white">
    <Image src={logo} alt="Logo" width={450} height={450} />
    <YouTube 
            videoId={videoId}
            opts={{ height: "320", width: "640" }}
          />
    <div className="bg-clip-text text-4xl font-extrabold">
      <TypewriterComponent 
                options={{
                    strings: [
                        "Redes sociais",
                        "Algoritmos",
                        "Monetização",
                        "Vendas",
                    ],
                    autoStart: true,
                    loop: true
                }}
            />
    </div>
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
            <Button variant={'purple'} className='md:text-lg p-4 md:p-6 rounded-full font-semibold'>
                QUERO ME INSCREVER AGORA!
            </Button>
        </Link>
    </div>
  )
}

export default page
