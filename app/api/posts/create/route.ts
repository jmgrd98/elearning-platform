import prismadb from "@/lib/prismadb";

interface PostCreateInput {
    userId: string;
    content: string;
    tags: string[];
    likes: number;
}

export const POST = async (req: any) => {
    try {
        const { userId, content, aulaId } = await req.json();
        
        const data: PostCreateInput = {
            userId,
            content,
            tags: [],
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
