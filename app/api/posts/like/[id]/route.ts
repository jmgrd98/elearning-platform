import prismadb from "@/lib/prismadb";

export const PUT = async (req: any) => {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const id = pathname.split('/').pop();
    try {
        const post = await prismadb.post.findUnique({
            where: { id },
        });

        if (!post) {
            return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 });
          }
        
        const updatedPost = await prismadb.post.update({
            where: { id },
            data: {
                likes: post!.likes + 1
            },
        });
        
        return new Response(JSON.stringify(updatedPost), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
