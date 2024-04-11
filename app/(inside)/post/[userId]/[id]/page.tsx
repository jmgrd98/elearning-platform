'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Post, User } from '@prisma/client';

const PostPage = () => {
  const { id } = useParams();
  const { userId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<Post>(`/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    const fetchUser = async () => {
      console.log(userId)
      try {
        const response = await axios.get<User>(`/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }

      fetchPost();
      fetchUser();
  }, [userId, id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-center p-10 w-full'>
      <div className='flex items-center gap-10 border border-red-500 w-full'>
        {post.imageUrl && (
          <>
            <Image
              src={post.imageUrl}
              alt="image"
              width={100}
              height={100}
              className="rounded-full"
            />

            <p className='text-black'>{user?.firstName}</p>
          </>
        )}
      </div>

      <div className='flex flex-col items-center gap-10'>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default PostPage;
