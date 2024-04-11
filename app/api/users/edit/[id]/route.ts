import prismadb from "@/lib/prismadb";

export const PUT = async (req: any) => {
    try {
        const { id } = req.params;
        const body = await req.json();
        const updatedUser = await prismadb.user.update({
            where: { id },
            data: {
                // content: body.content,
            },
        });
        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}