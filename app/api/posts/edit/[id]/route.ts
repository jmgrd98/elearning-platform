import prismadb from "@/lib/prismadb";

export const PUT = async (req: any) => {
    try {
        const { id } = req.params;
        const body = await req.json();
        const updatedPost = await prismadb.post.update({
            where: { id },
            data: {
                content: body.content,
            },
        });
        return new Response(JSON.stringify(updatedPost), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}