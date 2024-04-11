import prismadb from "@/lib/prismadb";
import { User } from "@prisma/client";

interface PostCreateInput {
    userId: string;
    imageUrl: string;
    title: string;
    content: string;
    tags: string[];
    likes: number;
    likedBy: string[];
    createdAt: Date;
    updatedAt: Date;
}

export const POST = async (req: any) => {
    try {
        const { userId, imageUrl, title, content, tags } = await req.json();
        
        const data: PostCreateInput = {
            userId,
            imageUrl,
            title,
            content,
            tags,
            likes: 0,
            likedBy: [],
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
