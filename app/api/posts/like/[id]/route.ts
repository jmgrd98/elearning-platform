import prismadb from "@/lib/prismadb";

export const PUT = async (req: any) => {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const id = pathname.split('/').pop();
    const { userId } = await req.json();
    console.log(userId)
    try {
        const post = await prismadb.post.findUnique({
            where: { id },
        });

        if (!post) {
            return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 });
        }

        let updatedLikedBy;
        if (post.likedBy.includes(userId)) {
            // If the user has already liked the post, decrement the likes count by 1
            const index = post.likedBy.indexOf(userId);
            updatedLikedBy = [...post.likedBy.slice(0, index), ...post.likedBy.slice(index + 1)];
        } else {
            // If the user hasn't liked the post yet, increment the likes count by 1
            updatedLikedBy = [...post.likedBy, userId];
        }

        const updatedPost = await prismadb.post.update({
            where: { id },
            data: {
                likes: post!.likes + (post.likedBy.includes(userId) ? -1 : 1), // Increment or decrement likes count
                likedBy: updatedLikedBy, // Update likedBy array
            },
        });

        return new Response(JSON.stringify(updatedPost), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
