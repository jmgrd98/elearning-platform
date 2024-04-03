'use client'

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import { Button } from './ui/button';


const Sidebar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLinkClick = (href: string) => {
    router.push(href);
  };

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
    <div className="w-1/5 min-h-screen left-0 bg-black text-white p-5 justify-between">
      <p onClick={() => handleLinkClick('/')} className="cursor-pointer font-bold text-2xl mb-10">Formando Creators</p>
      <div className="flex flex-col gap-3 items-left">
        <Button variant={'secondary'} onClick={() => handleLinkClick('/lesson1')} >Aula 1</Button>
        <Button variant={'secondary'} onClick={() => handleLinkClick('/lesson2')} >Aula 2</Button>
        <Button variant={'secondary'} onClick={() => handleLinkClick('/lesson3')} >Aula 3</Button>
      </div>

      <Button variant={'destructive'} onClick={onSubscribe} >Matricule-se</Button>
    </div>
  );
};

export default Sidebar;
