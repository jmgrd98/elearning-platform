import prismadb from "@/lib/prismadb";

interface DoubtCreateInput {
    authorId: string;
    content: string;
    lessonId: number;
    createdAt: Date;
    updatedAt: Date;
}

export const POST = async (req: any) => {
    try {
        const { authorId, content, lessonId } = await req.json();
        
        const data: DoubtCreateInput = {
            authorId,
            content,
            lessonId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const newDoubt = await prismadb.doubt.create({
            data,
        });

        return new Response(JSON.stringify(newDoubt), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
