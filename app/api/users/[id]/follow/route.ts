// /api/users/follow.js

import prismadb from "@/lib/prismadb";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
    const url = new URL(req.url);
    const userId = url.pathname.split('/').pop();
    const { followerId } = await req.json();
    
    try {
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
