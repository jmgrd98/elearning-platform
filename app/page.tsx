'use client'

import Video from 'next-video';
import getStarted from '../videos/get-started.mp4.json'
// import getStarted from 'https://youtu.be/tPcUszOmU24'
import { useUser } from "@clerk/nextjs"

export default function Home() {
  const { user } = useUser();

  return (
    <div className="p-5 text-center">
      <h1 className='text-5xl font-bold mb-5'>Olá, {user?.firstName}</h1>
      <Video width={700} height={450} src={getStarted} />
    </div>
  );
}
