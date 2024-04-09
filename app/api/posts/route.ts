import prismadb from "@/lib/prismadb";

export const GET = async () => {
    try {
        const posts = await prismadb.post.findMany();
        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
