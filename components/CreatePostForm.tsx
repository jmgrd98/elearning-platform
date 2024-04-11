'use client'

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { IoIosClose } from "react-icons/io";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "@clerk/nextjs";
import axios from "axios";

interface CreatePostFormProps {
    onClose: Function
}

const CreatePostForm = ({ onClose }: CreatePostFormProps) => {

    const { user } = useUser();

    const [titleValue, setTitleValue] = useState('');
    const [contentValue, setContentValue] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagsValue, setTagsValue] = useState('');

    const createPost = async () => {
        try {
            const response = await axios.post('/api/posts/create', {
                userId: user!.id,
                imageUrl: user!.imageUrl,
                title: titleValue,
                content: contentValue,
                tags: tags,
                likes: 0,
                likedBy: [],
            });
            console.log(response);
            toast.success('Post created successfully!');
            onClose();
        } catch (error) {
            console.error(error);
            toast.error('Failed to create post. Please try again!');
        }
    };
    


  return (
    <form  className="w-full max-h-full flex flex-col items-center justify-between">
        <div className='flex flex-col gap-5'>
            <Input
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            placeholder="Título"
            className='w-full'
            />
            <Textarea
            placeholder="Conteúdo"
            className='w-full max-h-full min-h-[150px]'
            value={contentValue}
            onChange={(e) => setContentValue(e.target.value)}
            />

        <div className='flex gap-3'>
            <Input
            placeholder='Tags'
            className='w-full'
            value={tagsValue}
            onChange={(e) => setTagsValue(e.target.value)}
            />
            <Button
            type="button"
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
        <Carousel className="w-full max-w-xs">
        <CarouselContent>
            {tags.map((tag: string) => (
                <CarouselItem key={tag}>
                    <Badge className="flex items-center gap-2 max-w-20">
                    <p>{tag}</p>
                    <IoIosClose className="cursor-pointer w-5 h-5" onClick={() => setTags(tags.filter((t: string) => t !== tag))}/>
                    </Badge>
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>
        </div>

        <Button
        onClick={(e) => {
            e.preventDefault(); 
            e.stopPropagation();
            createPost();
        }}
        variant='purple'
        className="w-1/2 relative bottom-0 mt-5"
        >
        Enviar
        </Button>
    </form>
  )
}

export default CreatePostForm
