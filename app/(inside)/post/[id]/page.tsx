// 'use client'

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const PostPage = ({ postId }: any) => {
//   const [post, setPost] = useState(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(`/api/posts/${postId}`);
//         setPost(response.data);
//       } catch (error) {
//         console.error('Error fetching post:', error);
//       }
//     };
//     fetchPost();
//   }, [postId]);

//   if (!post) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{post.title}</h1>
//       <p>{post.content}</p>
//       {/* Add other post details here */}
//     </div>
//   );
// };

// export default PostPage;
