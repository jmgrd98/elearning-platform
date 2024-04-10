'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const PostPage = () => {
  const {id} = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    console.log(id)
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    if (id) {
      fetchPost();
    }
  }, []);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-center p-10 w-full'>
      <div className='flex items-center gap-10 border border-red-500 w-full'>
        <Image
          src={post.imageUrl}
          alt="image"
          width={100}
          height={100}
          className="rounded-full"
        />
       <p></p>
      </div>

      <div className='flex flex-col items-center gap-10'>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default PostPage;
