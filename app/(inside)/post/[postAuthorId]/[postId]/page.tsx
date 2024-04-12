'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Post, User } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';

const PostPage = () => {
  const { user } = useUser();
  const { postAuthorId, postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [postAuthor, setPostAuthor] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<Post>(`/api/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    const fetchPostAuthor = async () => {
      try {
        const response = await axios.get<User>(`/api/users/${postAuthorId}`);
        setPostAuthor(response.data);
        checkIfAlreadyFollowing(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const checkIfAlreadyFollowing = (author: User) => {
      if (user) {
        console.log(user!.id)
        setIsFollowing(author.followers.includes(user!.id));
      }
      console.log(isFollowing)
    };

    fetchPost();
    fetchPostAuthor();
  }, [postAuthorId, postId, user]);

  const followUser = async () => {
    console.log('FOLLOWER ID', user!.id)
    console.log('POST AUTHOR ID', postAuthor!.id)
    try {
      await axios.put(`/api/users/follow/${postAuthor!.id}`, { followerId: user!.id });
      setPostAuthor((prevUser: any) => ({
        ...prevUser,
        followers: [...prevUser!.followers, user!.id],
      }));
      setIsFollowing(true);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const unfollowUser = async () => {
    console.log('FOLLOWER ID', user!.id)
    console.log('POST AUTHOR ID', postAuthor!.id)
    try {
      await axios.put(`/api/users/unfollow/${postAuthor!.id}`, { followerId: user!.id});
      setPostAuthor((prevUser: any) => ({
        ...prevUser,
        followers: prevUser!.followers.filter((id: string) => id !== user!.id),
      }));
      setIsFollowing(false);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  if (!post || !postAuthor) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-center p-10 w-full'>
      <div className='flex items-center gap-10 w-full mb-10'>
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
              <p className='font-bold text-2xl text-black'>{postAuthor!.firstName} {postAuthor!.lastName}</p>
              <Button variant='purple' onClick={isFollowing ? unfollowUser : followUser}>{isFollowing ? 'Deixar de seguir' : '+ Seguir'}</Button>
            </div>
            <div className='flex items-center gap-5'>
              <Badge variant='secondary' className='cursor-pointer'>
                {postAuthor!.followers.length} seguidores
              </Badge>
              <Badge variant='secondary' className='cursor-pointer'>
                {postAuthor!.following.length} seguindo
              </Badge>
            </div>
          </div>
          </>
        )}
      </div>

      <div className='flex flex-col items-center gap-8'>
        <h1 className='font-bold text-5xl'>{post.title}</h1>
        <div className='flex items-left text-left self-start gap-5'>
          {post.tags.map((tag: string) => (
            <div key={tag}>
              <Badge variant={'secondary'}># {tag}</Badge>
            </div>
          ))}
        </div>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default PostPage;
