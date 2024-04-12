import prismadb from "@/lib/prismadb";
import { User } from "@prisma/client";

interface PostCreateInput {
    authorId: string;
    imageUrl: string;
    title: string;
    content: string;
    tags: string[];
    likes: number;
    likedBy: string[];
    comments: string[];
    createdAt: Date;
    updatedAt: Date;
    author: User
}

export const POST = async (req: any) => {
    try {
        const { authorId, author, imageUrl, title, content, tags } = await req.json();
        
        const data: PostCreateInput = {
            authorId,
            author,
            imageUrl,
            title,
            content,
            tags,
            likes: 0,
            likedBy: [],
            comments: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const newPost = await prismadb.post.create({
            data,
        });

        return new Response(JSON.stringify(newPost), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
