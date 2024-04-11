import prismadb from "@/lib/prismadb";

export const GET = async () => {
    try {
        const users = await prismadb.user.findMany();
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
