import prismadb from "@/lib/prismadb";

export const POST = async (req: any) => {
    try {
        const {userId, content} = await req.json();
        const newDoubt = await prismadb.doubt.create({
            data: {
                userId,
                content
            },
        });
        return new Response(JSON.stringify(newDoubt), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}