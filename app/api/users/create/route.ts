import prismadb from "@/lib/prismadb";
import { Doubt, Post } from "@prisma/client";

interface UserCreateInput {
    id: string;
    progress: number;
    followers: number;
    following: number;
}

export const POST = async (req: any) => {
    try {
        const { id } = await req.json();
        
        const data: UserCreateInput = {
            id,
            progress: 0,
            followers: 0,
            following: 0,
        };

        const newUser = await prismadb.user.create({
            data,
        });

        return new Response(JSON.stringify(newUser), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
