'use client'

import Video from 'next-video';
import getStarted from '../videos/get-started.mp4.json'
import { useUser } from "@clerk/nextjs"

export default function Home() {
  const { user } = useUser();

  return (
    <div className="p-10 text-center">
      <h1 className='text-5xl font-bold'>Olá, {user?.firstName}</h1>
      {/* <Video width={800} height={500} src={getStarted} /> */}
    </div>
  );
}
