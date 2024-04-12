import prismadb from "@/lib/prismadb";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const url = new URL(req.url);
    const pathname = url.pathname;
    console.log(pathname)
    const id = pathname.split('/').pop();
    try {
        const post = await prismadb.post.findUnique({
            where: { id },
        });

        if (!post) {
            return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(post), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
