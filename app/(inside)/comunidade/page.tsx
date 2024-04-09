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
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { IoIosClose } from "react-icons/io";


const page = () => {
  const { user } = useUser();

  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [tags, setTags] = useState([]);
  const [tagsValue, setTagsValue] = useState('');

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

  const createPost = async () => {
    try {
      const response = await axios.post('/api/posts/create', {
        userId: user!.id,
        title: titleValue,
        content: inputValue,
        tags
      });
      console.log(response);
      toast.success('Post created successfully!');
      setInputValue('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create post. Please try again!');
    }
  };

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
          <DialogContent className='h-full w-full max-h-[450px] p-3' onCloseAutoFocus={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle className='text-xl font-bold mb-5'>Criar post</DialogTitle>
              <DialogDescription className='flex flex-col w-full'>
                <form onSubmit={createPost} className="w-full flex flex-col items-center justify-between">
                  <div className='flex flex-col gap-5'>
                    <Input
                      placeholder="Título"
                      className='w-full'
                    />
                    <Textarea
                      placeholder="Conteúdo"
                      className='w-full'
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />

                  <div className='flex gap-3'>
                    <Input 
                      placeholder='Tags'
                      className='w-full'
                      value={tagsValue}
                      onChange={(e) => setTagsValue(e.target.value)}
                    />
                    <Button 
                    variant={'ghost'}
                    className='w-1/2'
                    onClick={() => {
                      setTags([...tags, tagsValue]);
                      setTagsValue('');
                      }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        setTags([...tags, tagsValue]);
                        setTagsValue('');
                      } 
                    }}
                    >
                        Adicionar
                    </Button>
                  </div>

                      <div className='flex items-center gap-3 mb-5'>
                          {tags.map((tag: string) => (
                            <Badge className="flex items-center gap-2" key={tag}>
                              <p>{tag}</p>
                              <IoIosClose className="cursor-pointer w-3 h-3" onClick={() => setTags(tags.filter((t: string) => t !== tag))}/>
                            </Badge>
                          ))}
                      </div>
                  </div>

                  <Button type="submit" variant='purple' className="w-1/2">Enviar</Button>
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

export default page;
