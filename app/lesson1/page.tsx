'use client'

import Video from 'next-video'
import Youtube from 'react-youtube'
import videoURL from '../../videos/get-started.mp4.json'
import { Textarea } from '@/components/ui/textarea';
import Iframe from 'react-iframe'
const video = {
  url: videoURL,
  // poster: 'https://example.com/poster.jpg',
};

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};

const videoId = 'https://www.youtube.com/watch?v=iu-LBY7NXD4';

const page = () => {
  return (
    <div className='p-5 text-center flex flex-col items-center'>
      <h1 className='text-5xl font-bold mb-5'>Aula 1</h1>
      {/* <Video width={700} height={450} className='m-0' src={video.url} /> */}
      <iframe width="560" height="315" src="https://www.youtube.com/embed/iu-LBY7NXD4?si=N9TO0blaPMhOH4ZP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

      <div className='flex flex-col gap-5 mt-5'>
        <p className='text-xl font-bold'>Tem alguma dúvida sobre essa aula? Compartilhe conosco e iremos te ajudar!</p>
        <Textarea placeholder='Compartilhe sua dúvida' className='bg-black/5'/>
      </div>
    </div>
  )
}

export default page
