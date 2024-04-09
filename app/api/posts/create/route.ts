import prismadb from "@/lib/prismadb";

interface PostCreateInput {
    userId: string;
    title: string;
    imageUrl: string;
    content: string;
    tags: string[];
    likes: number;
}

export const POST = async (req: any) => {
    try {
        const { userId, content, title, tags, imageUrl } = await req.json();
        
        const data: PostCreateInput = {
            userId,
            title,
            imageUrl,
            content,
            tags,
            likes: 0
        };

        const newPost = await prismadb.post.create({
            data,
        });

        return {
            statusCode: 201,
            body: JSON.stringify(newPost)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    }
}
