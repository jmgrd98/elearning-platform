'use client'

import { Progress } from '../components/ui/progress';
import { Button } from "@/components/ui/button";
import { useUserProgress } from "../context/ProgressContext";
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export default function Home() {
  const { user } = useUser();
  const { progress, setProgress } = useUserProgress();
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [setProgress])

  return (
    <div className="p-5 text-center flex flex-col gap-20 items-center">
      <h1 className='text-5xl font-bold'>Olá, {user?.firstName}!</h1>

      <div className="flex flex-col gap-3">
        <p className="text-2xl font-bold">Esse é o seu progesso no curso</p>
        <Progress value={progress} className="w-[60%]" />
      </div>

      <Button variant={'purple'}>Continuar de onde parei</Button>
    </div>
  );
}
