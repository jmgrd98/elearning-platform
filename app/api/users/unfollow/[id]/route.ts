import prismadb from "@/lib/prismadb";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
    const url = new URL(req.url);
    const postAuthorId = url.pathname.split('/').pop();
    const { followerId } = await req.json();

    console.log('FOLLOWER ID', followerId);
    console.log('POST AUTHOR ID', postAuthorId);
    
    try {
        const user = await prismadb.user.findUnique({
            where: { id: postAuthorId },
        });

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        // Update the user's followers array by filtering out the followerId
        const updatedUser = await prismadb.user.update({
            where: { id: postAuthorId },
            data: {
                followers: {
                    // Remove the followerId from the followers array
                    set: user.followers.filter(id => id !== followerId)
                }
            }
        });

        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
};
