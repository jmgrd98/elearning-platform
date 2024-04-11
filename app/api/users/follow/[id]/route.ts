import prismadb from "@/lib/prismadb";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
    const url = new URL(req.url);
    const userId = url.pathname.split('/').pop();
    const { followerId } = await req.json();
    
    try {
        const user = await prismadb.user.findUnique({
            where: { id: userId },
            select: { followers: true },
        });

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        if (user.followers.includes(followerId)) {
            return new Response(JSON.stringify({ message: 'User is already following this user' }), { status: 400 });
        }
        
        const updatedUser = await prismadb.user.update({
            where: { id: userId },
            data: {
                followers: {
                    push: followerId
                }
            }
        });

        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
};
