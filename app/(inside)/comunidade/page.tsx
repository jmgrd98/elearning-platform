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
  }, [])


  return (
    <div className="p-5 text-center flex flex-col gap-10 items-center">
      <h1 className='text-4xl font-bold'>Comunidade</h1>

      <Dialog>
          <DialogTrigger asChild>
            <Button variant={'purple'} className='rounded-full p-3 cursor-pointer'>
              Criar Post
            </Button>
            </DialogTrigger>
          <DialogContent className='h-full max-h-[600px]' onCloseAutoFocus={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle className='mb-5'>Tire sua dúvida com o Luide AI! 🤖</DialogTitle>
              <DialogDescription>

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
  )
}

export default page
