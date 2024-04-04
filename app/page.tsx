'use client'
;
import { useUser } from "@clerk/nextjs";
import { Progress } from '../components/ui/progress';
import { useState, useEffect } from 'react';

export default function Home() {
  const { user } = useUser();
  
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="p-5 text-center flex flex-col items-center">
      <h1 className='text-5xl font-bold mb-5'>Olá, {user?.firstName}</h1>
      <p className="text-2xl font-bold">Esse é o seu progesso no curso</p>


      <Progress value={progress} className="w-[60%] mt-20" />
    </div>
  );
}
