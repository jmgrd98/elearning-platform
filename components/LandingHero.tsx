'use client'

import React from 'react'
import TypewriterComponent from 'typewriter-effect'
import YouTube from 'react-youtube'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from './ui/button'
import Logo from './Logo'
import { Separator } from './ui/separator'


const LandingHero = () => {
    const [videoId, setVideoId] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          const options = {
            method: 'GET',
            url: 'https://yt-api.p.rapidapi.com/search',
            params: {query: 'luide%20comunismo'},
            headers: {
              'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
              'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
            }
          };
          try {
            // const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=luide%20comunismo&key=${process.env.YOUTUBE_API_KEY}`);
            const response = await axios.request(options);
            const videoId = response.data.data[0].videoId;
            console.log(response.data.data[0].videoId)
            setVideoId(videoId);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);

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
    <div className='bg-black w-full flex flex-col items-center gap-5 mb-5'>
        <Logo width={450} height={450} />
        <YouTube 
                videoId={videoId}
                opts={{ height: "320", width: "640" }}
            />
        <div className="bg-clip-text text-6xl font-extrabold text-white my-5">
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
            {/* <Link > */}
                <Button onClick={onSubscribe} variant={'purple'} className='md:text-lg p-4 md:p-6 rounded-full font-semibold my-10'>
                    QUERO ME INSCREVER AGORA!
                </Button>
            {/* </Link> */}
            <Separator />
    </div>
  )
}

export default LandingHero
