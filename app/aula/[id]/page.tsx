'use client'

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import Youtube from 'react-youtube';
import { useUser } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { IoIosCloseCircle } from "react-icons/io";
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useUserProgress } from '@/context/ProgressContext';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import AiChat from '../../../components/AiChat';

const Page = () => {
  const {user} = useUser();
  const { id } = useParams();
  const { progress, setProgress } = useUserProgress();
  const router = useRouter();

  const [duvidas, setDuvidas] = useState<any>([]);
  const [newDoubtText, setNewDoubtText] = useState<string>('');
  const [videoId, setVideoId] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    try {
      axios.get('/api/doubts').then((response) => {
        setDuvidas(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=luide%20comunismo&key=${process.env.YOUTUBE_API_KEY}`);
        const videoId = response.data.items[0].id.videoId;
        setVideoId(videoId);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleVideoEnd = () => {
    setIsButtonDisabled(true);
    setProgress((prevProgress: number) => prevProgress + 33);
  };

  const handlePreviousLesson = () => {
    const previousLessonId = Number(id) - 1;
    router.push(`/aula/${previousLessonId}`);
  };

  const handleNextLesson = () => {
    const nextLessonId = Number(id) + 1;
    router.push(`/aula/${nextLessonId}`);
  };

  const handleSubmitDoubt = async () => {
    if (newDoubtText.trim() !== '') {
      try {
        const response = await axios.post('/api/doubts/create', {
          userId: user?.id,
          content: newDoubtText,
          aulaId: id
        });
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

  const handleDeleteDoubt = async (doubtId: string) => {
    try {
      await axios.delete(`/api/doubts/delete/${doubtId}`);
      setDuvidas(duvidas.filter((doubt: any) => doubt.id !== doubtId));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='p-5 text-center flex flex-col items-center'>
      <h1 className='text-5xl font-bold mb-5'>Aula {id}</h1>

    <div className='flex flex-col gap-3'>
      <div className='flex items-top gap-5'>
        <div className='flex flex-col gap-2 mb-2'>
        <Youtube 
            videoId={videoId}
            onEnd={handleVideoEnd}
            opts={{ height: "320", width: "640" }}
          />
          <div className='flex items-center gap-5'>
            <Button onClick={handlePreviousLesson} variant={'default'} className={id !== '1' ? 'flex items-center w-1/2 gap-3' : 'w-1/2 hidden'}>
              <p>Aula anterior</p>
              <FaArrowLeft className='text-white h-5 w-5' />
            </Button>

            <Button disabled={isButtonDisabled} onClick={handleNextLesson} variant={'default'} className='flex items-center w-1/2 gap-3'>
              <p>Próxima aula</p>
              <FaArrowRight className='text-white h-5 w-5' />
            </Button>
          </div>
          </div>
          <AiChat />
      </div>

      
    </div>

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
                <IoIosCloseCircle onClick={() => handleDeleteDoubt(duvida.id)} className='text-red-500/80 hover:text-red-500 cursor-pointer w-[25px] h-[25px]' />
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
