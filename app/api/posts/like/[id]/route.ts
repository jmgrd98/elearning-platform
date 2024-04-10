import prismadb from "@/lib/prismadb";

export const PUT = async (req: any) => {
    try {
        const { id } = req.params;
        // Retrieve the current post from the database
        const post = await prismadb.post.findUnique({
            where: { id },
        });
        
        // Increment likes count by 1
        const updatedPost = await prismadb.post.update({
            where: { id },
            data: {
                likes: post!.likes + 1 // Increment likes count by 1
            },
        });
        
        return new Response(JSON.stringify(updatedPost), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
