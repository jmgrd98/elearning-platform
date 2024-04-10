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
} from "@/components/ui/dialog";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "@clerk/nextjs";
import CreatePostForm from "@/components/CreatePostForm";


const page = () => {
  const { user } = useUser();

  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="p-5 text-center flex flex-col gap-10 items-center">
        <h1 className='text-4xl font-bold'>Comunidade</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'purple'} className='rounded p-3 cursor-pointer'>
              Criar post
            </Button>
          </DialogTrigger>
          <DialogContent className='h-full w-full max-h-[500px] p-3' onCloseAutoFocus={(e) => e.preventDefault()}>
            <DialogHeader className='h-full'>
              <DialogTitle className='text-xl font-bold mb-5'>Criar post</DialogTitle>
              <DialogDescription className='flex flex-col w-full max-h-full'>
                <CreatePostForm />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <p>Interaja com a comunidade de Creators!</p>

        <Input placeholder="Pesquise por posts, tags ou usuários..." className='w-1/2' />

        {posts.map((post: any) => (
          <></>
          // <PostCard key={post.id} post={post} />
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

export default page;
