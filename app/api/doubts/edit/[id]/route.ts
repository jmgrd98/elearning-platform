import prismadb from "@/lib/prismadb";

export const PUT = async (req: any) => {
    try {
        const { id } = req.params;
        const body = await req.json();
        const updatedDoubt = await prismadb.doubt.update({
            where: { id },
            data: {
                content: body.content,
            },
        });
        return new Response(JSON.stringify(updatedDoubt), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}