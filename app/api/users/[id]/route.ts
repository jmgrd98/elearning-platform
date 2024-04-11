import prismadb from "@/lib/prismadb";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const url = new URL(req.url);
    const pathname = url.pathname;
    console.log(url.pathname)
    const id = pathname.split('/').pop();

    try {
        const user = await prismadb.user.findUnique({
            where: { id },
        });

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
