'use client'

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import Iframe from 'react-iframe'
import { useUser } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { IoIosCloseCircle } from "react-icons/io";
import axios from 'axios';

const Page = () => {
  const {user} = useUser();
  const [duvidas, setDuvidas] = useState<any>([]);
  const [newDoubtText, setNewDoubtText] = useState<string>('');

  const handleSubmitDoubt = async () => {
    if (newDoubtText.trim() !== '') {
      try {
        const response = await axios.post('/api/doubt/new', {
          userId: user?.id,
          content: newDoubtText,
        })
        const newDoubt = response.data;
        setDuvidas([...duvidas, newDoubt]);
        setNewDoubtText('');
        toast.success('Obrigado por compartilhar sua dúvida!');
        setTimeout(() => {
          toast.success('O professor irá responder assim que possível. 😉');
        }, 1000)
      } catch (error) {
        console.error(error);
        toast.error('Ocorreu um erro ao compartilhar sua dúvida.');
      }
    }
  };

  return (
    <div className='p-5 text-center flex flex-col items-center'>
      <h1 className='text-5xl font-bold mb-5'>Aula 1</h1>

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
            <div className='flex flex-col text-left gap-3 w-full'>
              <div className='flex items-center justify-between'>
                <p className='font-bold'>{user?.firstName} {user?.lastName}</p>
                <IoIosCloseCircle onClick={() => setDuvidas(duvidas.filter((_: any, i: number) => i !== index))} className='text-red-500/80 hover:text-red-500 cursor-pointer w-[25px] h-[25px]' />
              </div>
              <p className='p-2 rounded'>{duvida.content}</p>
            </div>
          </div>
        ))}

        <Textarea
          placeholder='Compartilhe sua dúvida'
          className='bg-black/20'
          onChange={(event) => setNewDoubtText(event.target.value)}
        />
        <Button variant={'purple'} onClick={() => handleSubmitDoubt()}>
            Enviar dúvida
        </Button>

      </div>
      <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={true}
                pauseOnHover={true}
                className={'z-0'}
            />
    </div>
  );
};

export default Page;
