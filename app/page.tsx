'use client'

import Video from 'next-video';
import { useUser } from "@clerk/nextjs"
import videoURL from '../public/screen-capture.mp4'

const video = {
  url: videoURL,
  // poster: 'https://example.com/poster.jpg',
};

export default function Home() {
  const { user } = useUser();

  return (
    <div className="p-5 text-center">
      <h1 className='text-5xl font-bold mb-5'>Olá, {user?.firstName}</h1>
      <Video width={700} height={450} src={video.url} />
    </div>
  );
}
