import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

interface UserCreateInput {
    id: string;
    imageUrl: string;
    firstName: string;
    lastName: string;
    progress: number;
    followers: string[];
    following: string[];
}

export const POST = async (req: NextRequest) => {
    try {
        const { userId, imageUrl, firstName, lastName } = await req.json();
        
        const existingUser = await prismadb.user.findUnique({
            where: { id: userId },
        });

        if (existingUser) {
            return new Response(JSON.stringify({ message: "User already exists." }), { status: 400 });
        }

        const data: UserCreateInput = {
                id: userId,
                imageUrl,
                firstName,
                lastName,
                progress: 0,
                followers: [],
                following: [],
        }

        const newUser = await prismadb.user.create({
            data,
        });

        return new Response(JSON.stringify(newUser), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

