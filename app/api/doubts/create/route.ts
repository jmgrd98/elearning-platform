import prismadb from "@/lib/prismadb";

interface DoubtCreateInput {
    userId: string;
    content: string;
    aulaId: string;
}

export const POST = async (req: any) => {
    try {
        const { userId, content, aulaId } = await req.json();
        
        const data: any = {
            userId,
            content,
            aulaId
        };

        const newDoubt = await prismadb.doubt.create({
            data,
        });

        return new Response(JSON.stringify(newDoubt), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
