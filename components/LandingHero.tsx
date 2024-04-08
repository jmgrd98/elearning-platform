'use client'

import React from 'react'
import TypewriterComponent from 'typewriter-effect'
import YouTube from 'react-youtube'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from './ui/button'
import Logo from './Logo'
import { Separator } from './ui/separator'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'

const LandingHero = () => {

    const isSignedIn = useAuth()

    const [videoId, setVideoId] = useState('');
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const fetchData = async () => {
    //       const options = {
    //         method: 'GET',
    //         url: 'https://yt-api.p.rapidapi.com/search',
    //         params: {query: 'luide%20estrategia%20funil%20conteudo'},
    //         headers: {
    //           'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
    //           'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
    //         }
    //       };
    //       try {
    //         // const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=luide%20comunismo&key=${process.env.YOUTUBE_API_KEY}`);
    //         const response = await axios.request(options);
    //         const videoId = response.data.data[0].videoId;
    //         console.log(response.data.data[0].videoId)
    //         setVideoId(videoId);
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     };
    
    //     fetchData();
    //   }, []);

      const onSubscribe = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/stripe');
    
            window.location.href = response.data.url;
        } catch (error) {
            console.error(error, 'STRIPE_CLIENT_ERROR')
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className='bg-black w-full flex flex-col items-center gap-5'>
        <Logo width={300} height={300} />
        <div className="bg-clip-text text-9xl font-extrabold text-white mt-10 mb-20">
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
        <YouTube 

                videoId={'xrCcO_YNVCc'}
                opts={{ height: "640", width: "960" }}
            />
            <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
                <Button onClick={onSubscribe} variant={'purple'} className='md:text-lg p-6 md:p-8 rounded-full my-10'>
                    <p className='text-4xl font-semibold '>QUERO ME INSCREVER AGORA!</p>
                </Button>
            </Link>
            <Separator />
    </div>
  )
}

export default LandingHero
