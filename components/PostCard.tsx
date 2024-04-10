'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react";
import axios from "axios";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

const PostCard = ({ post }: any) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const likePost = async () => {
    try {
      const response = await axios.put(`/api/posts/edit/${post.id}`);
      if (response.status === 200) {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader className='flex items-center gap-5 w-full'>
        <img src={post.imageUrl} alt="image" width={50} height={50} className='rounded-full' />
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {post.content}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-2">
          {liked ? 
            <AiFillLike className='w-5 h-5 cursor-pointer text-blue-500' onClick={likePost}/> :
            <AiOutlineLike className='w-5 h-5 cursor-pointer' onClick={likePost}/>
          }
          <span>{likes}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
