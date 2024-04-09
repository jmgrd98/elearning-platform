import prismadb from "@/lib/prismadb";

interface PostCreateInput {
    userId: string;
    title: string;
    content: string;
    tags: string[];
    likes: number;
}

export const POST = async (req: any) => {
    try {
        const { userId, content, title, tags } = await req.json();
        
        const data: PostCreateInput = {
            userId,
            title,
            content,
            tags,
            likes: 0
        };

        const newPost = await prismadb.post.create({
            data,
        });

        return new Response(JSON.stringify(newPost), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
