'use client'

import Video from 'next-video'
import videoURL from '../../videos/get-started.mp4.json'

const video = {
  url: videoURL,
  // poster: 'https://example.com/poster.jpg',
};

const page = () => {
  return (
    <div className='p-5 text-center flex flex-col items-center'>
      <h1 className='text-5xl font-bold mb-5'>Aula 3</h1>
      <Video width={700} height={450} src={video.url} />
    </div>
  )
}

export default page
