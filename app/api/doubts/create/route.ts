import prismadb from "@/lib/prismadb";

export const POST = async (req: any) => {
    try {
        const body = await req.json();
        const newDoubt = await prismadb.doubt.create({
            data: {
                userId: body.userId,
                content: body.content,
            },
        });
        return new Response(JSON.stringify(newDoubt), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}