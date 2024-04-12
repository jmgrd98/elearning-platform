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
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Post } from "@prisma/client";

interface PostCardProps {
  post: Post;
  postAuthorId: string;
  userName: string | undefined;
}

const PostCard = ({ post, postAuthorId, userName }: PostCardProps) => {
  const { user } = useUser();
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log('POST', post);
    console.log('POST AUTHOR ID', postAuthorId)
  }, [])

  useEffect(() => {
    const isLiked = post.likedBy.includes(postAuthorId);
    setLiked(isLiked);
  }, [post.likedBy, postAuthorId]);

  const toggleLike = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handleCardClick = () => {
    router.push(`/post/${postAuthorId}/${post.id}`);
  };

  const limitedContent = post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content;

  const matchesSearch = (
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
    formatDate(post.createdAt.toString()).includes(searchTerm.toLowerCase()) ||
    userName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!matchesSearch) return null;

  return (
    <Card onClick={handleCardClick} className="w-full cursor-pointer z-0 justify-between">
      <CardHeader className="flex items-center gap-5 w-full">
        <Image
          src={post.imageUrl}
          alt="image"
          width={50}
          height={50}
          className="rounded-full"
        />
        <CardTitle className='text-left'>{post.title}</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-3'>
        <p>{limitedContent}</p>
        {post.content.length > 100 && (
          <span
            className="text-blue-500 cursor-pointer"
            onClick={handleCardClick}
          >
            Ver Mais
          </span>
        )}
        <div className='flex items-center gap-3'>
          {post.tags.map((tag: string) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between z-10">
        <div className="font-semibold text-sm">
          {formatDate(post.createdAt.toString())}
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
