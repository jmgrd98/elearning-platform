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
import 'react-toastify/dist/ReactToastify.css';
import CreatePostForm from "@/components/CreatePostForm";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";

const Page = () => {

  const {user} = useUser();

  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

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
  }, [posts]);

  return (
    <>
      <div className="p-5 text-center flex flex-col gap-10 items-center">
        <h1 className='text-4xl font-bold'>Comunidade</h1>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant={'purple'} className='rounded p-3 cursor-pointer'>
              Criar post
            </Button>
          </DialogTrigger>
          <DialogContent className='h-full w-full max-h-[500px] p-3' onCloseAutoFocus={(e) => e.preventDefault()}>
            <DialogHeader className='h-full'>
              <DialogTitle className='text-xl font-bold mb-5'>Criar post</DialogTitle>
              <DialogDescription className='flex flex-col w-full max-h-full'>
                <CreatePostForm onClose={() => setDialogOpen(false)} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <p>Interaja com a comunidade de Creators!</p>

        <div className='flex items-center justify-center gap-5 w-full'>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Pesquise por posts, tags ou usuários..."
            className='w-2/3'
          />

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="+likes">Mais likes</SelectItem>
                <SelectItem value="-likes">Menos likes</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full p-10">
          {posts.map((post: any) => (
            <PostCard key={post.id} post={post} userId={user!.id} userName={user!.firstName?.replace(/ /g, '-').toLowerCase()} />
          ))}
        </div>

      </div>
    </>
  )
}

export default Page;
