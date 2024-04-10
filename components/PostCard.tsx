'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useState } from "react";

const PostCard = ({ post }: any) => {

  const [liked, setLiked] = useState(false);

  const like = (value: boolean) => {
    if (value !== liked) {
      setLiked(value);
  
      if (value) {
        post.likes++;
      } else {
        post.likes--;
      }
    }
  
    console.log(post.likes);
    console.log(liked)
  };
  

  return (
    <Card className="w-[350px]">
      <CardHeader className='flex items-center gap-5 w-full'>
        <Image src={post.imageUrl} alt="image" width={50} height={50} className='rounded-full' />
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {post.content}
      </CardContent>
      <CardFooter className="flex justify-between">
        {liked ? <AiFillLike className='w-5 h-5 cursor-pointer' onClick={() => like(false)}/> : <AiOutlineLike className='w-5 h-5 cursor-pointer' onClick={() => like(true)}/>}
      </CardFooter>
    </Card>
  )
}

export default PostCard
