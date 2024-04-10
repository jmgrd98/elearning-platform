import prismadb from "@/lib/prismadb";

interface PostCreateInput {
    userId: string;
    title: string;
    imageUrl: string;
    content: string;
    tags: string[];
    likes: number;
    createdAt: Date;
}

export const POST = async (req: any) => {
    try {
        const { userId, content, title, tags, imageUrl, likes } = await req.json();
        
        const data: PostCreateInput = {
            userId,
            title,
            imageUrl,
            content,
            tags,
            likes,
            createdAt: new Date()
        };

        const newPost = await prismadb.post.create({
            data,
        });

        return new Response(JSON.stringify(newPost), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
