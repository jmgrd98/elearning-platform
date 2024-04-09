import prismadb from "@/lib/prismadb";

export const DELETE = async (req: any) => {
    try {
        const { pathname } = req.nextUrl;
        const id = pathname.substring(pathname.lastIndexOf("/") + 1);
        const deletedPost = await prismadb.post.delete({
            where: { id },
        });
        return new Response(JSON.stringify({ deletedPost }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}