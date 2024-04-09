'use client'

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import PostCard from "@/components/PostCard";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const page = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
        console.log(posts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const createPost = async () => {
    try {
      await axios.post('/api/posts/create');
      toast.success('Post criado com sucesso!');
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
      <div className="p-5 text-center flex flex-col gap-10 items-center">
        <h1 className='text-4xl font-bold'>Comunidade</h1>

        <Dialog>
            <DialogTrigger asChild>
              <Button variant={'purple'} className=' rounded p-3 cursor-pointer'>
                Criar post
              </Button>
              </DialogTrigger>
            <DialogContent className='h-full max-h-[600px]' onCloseAutoFocus={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle className='text-xl font-bold mb-5'>Criar post</DialogTitle>
                <DialogDescription className='flex flex-col items-center gap-5'>
                  <form>
                    <Input placeholder="Título" className='w-1/2' />
                    <Textarea placeholder="Conteudo" className='w-1/2' />
                    <Button onClick={() => createPost()} className="w-1/2">Enviar</Button>
                  </form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
        </Dialog>

        <p>Interaja com a comunidade de Creators!</p>

        <Input placeholder="Pesquise por posts, tags ou usuários..." className='w-1/2' />

        {posts.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))}
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
    </>
  )
}

export default page
