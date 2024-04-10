'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useUser } from "@clerk/nextjs";

const PostCard = ({ post, userId }: any) => {

  const { user } = useUser();

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  // Check if the user has already liked the post
  useEffect(() => {
    const isLiked = post.likedBy.includes(userId);
    setLiked(isLiked);
  }, [post.likedBy, userId]);

  const toggleLike = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/posts/like/${post.id}`, { userId: user!.id });
      if (response.status === 200) {
        if (liked) {
          setLikes(likes - 1);
        } else {
          setLikes(likes + 1);
        }
        setLiked(!liked);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Card className="w-[350px]">
      <CardHeader className="flex items-center gap-5 w-full">
        <img
          src={post.imageUrl}
          alt="image"
          width={50}
          height={50}
          className="rounded-full"
        />
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>{post.content}</CardContent>
      <CardFooter className="flex justify-between">
        <div className="font-semibold text-sm">
          {formatDate(post.createdAt)}
        </div>
        <div className="flex items-center gap-2">
          {liked ? (
            <AiFillLike
              className="w-5 h-5 cursor-pointer text-blue-500"
              onClick={(e) => toggleLike(e)}
            />
          ) : (
            <AiOutlineLike
              className="w-5 h-5 cursor-pointer"
              onClick={(e) => toggleLike(e)}
            />
          )}
          <span className="font-semibold">{likes}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
