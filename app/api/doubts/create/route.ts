import prismadb from "@/lib/prismadb";

interface DoubtCreateInput {
    userId: string;
    content: string;
    lessonId: number;
    createdAt: Date;
    updatedAt: Date;
}

export const POST = async (req: any) => {
    try {
        const { userId, content, lessonId } = await req.json();
        
        const data: DoubtCreateInput = {
            userId,
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
