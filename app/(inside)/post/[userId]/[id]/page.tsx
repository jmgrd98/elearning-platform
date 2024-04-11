'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Post, User } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const PostPage = () => {
  const { userId, id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

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
      try {
        const response = await axios.get<User>(`/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchPost();
    fetchUser();
  }, [userId, id]);

  const followUser = async () => {
    try {
      await axios.put(`/api/users/follow/${userId}`, { followerId: user!.id });
      setUser((prevUser: any) => ({
        ...prevUser,
        followers: [...prevUser!.followers, user!.id], // Update followers array
      }));
      setIsFollowing(true);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const unfollowUser = async () => {
    try {
      await axios.put(`/api/users/unfollow/${userId}`, { followerId: user!.id});
      setUser((prevUser: any) => ({
        ...prevUser,
        followers: prevUser!.followers.filter((id: string) => id !== user!.id), // Remove follower from followers array
      }));
      setIsFollowing(false);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  if (!post || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-center p-10 w-full'>
      <div className='flex items-center gap-10 w-full'>
        {post.imageUrl && (
          <>
            <Image
              src={post.imageUrl}
              alt="image"
              width={100}
              height={100}
              className="rounded-full"
            />

          <div className='flex flex-col items-left gap-5 w-full'>
            <div className='flex items-center justify-between w-full'>
              <p className='font-bold text-2xl text-black'>{user.firstName} {user.lastName}</p>
              <Button variant='purple' onClick={isFollowing ? unfollowUser : followUser}>{isFollowing ? 'Deixar de seguir' : '+ Seguir'}</Button>
            </div>
            <div className='flex items-center gap-5'>
              <Badge variant='secondary' className='cursor-pointer'>
                {user.followers.length} seguidores
              </Badge>
              <Badge variant='secondary' className='cursor-pointer'>
                {user.following.length} seguindo
              </Badge>
            </div>
          </div>
          </>
        )}
      </div>

      <div className='flex flex-col items-center gap-10'>
        <h1 className='font-bold text-5xl'>{post.title}</h1>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default PostPage;
