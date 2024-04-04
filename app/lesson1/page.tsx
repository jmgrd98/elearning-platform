'use client'

import { Button } from '@/components/ui/button';
import videoURL from '../../videos/get-started.mp4.json'
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import Iframe from 'react-iframe'
import { useUser } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Page = () => {
  const {user} = useUser();
  const [duvidas, setDuvidas] = useState<any>([]);
  const [newDoubt, setNewDoubt] = useState<string>('');

  // Function to handle submitting a new doubt
  const handleSubmitDoubt = (newDoubt: any) => {
    setDuvidas([...duvidas, newDoubt]);
  };

  return (
    <div className='p-5 text-center flex flex-col items-center'>
      <h1 className='text-5xl font-bold mb-5'>Aula 1</h1>

      {/* Embedded YouTube video */}
      <Iframe
        url="https://www.youtube.com/embed?v=tPcUszOmU24"
        width="640px"
        height="320px"
        id=""
        className=""
        display="block"
        position="relative"
      />

      <div className='flex flex-col gap-5 mt-5'>
        <p className='text-xl font-bold'>Tem alguma dúvida sobre essa aula? Compartilhe conosco e iremos te ajudar!</p>

        {duvidas.map((duvida: any, index: number) => (
          <div key={index} className="bg-black/20 p-2 rounded-md flex items-center gap-5">
            <Avatar>
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col text-left gap-3'>
              <p className='font-bold'>{user?.firstName} {user?.lastName}</p>
              <p className='p-2 rounded'>{duvida}</p>
            </div>
          </div>
        ))}

        <Textarea
          placeholder='Compartilhe sua dúvida'
          className='bg-black/20'
          onChange={(event) => setNewDoubt(event.target.value)}
        />
        <Button variant={'purple'} onClick={() => handleSubmitDoubt(newDoubt)}>Enviar dúvida</Button>
      </div>
    </div>
  );
};

export default Page;
