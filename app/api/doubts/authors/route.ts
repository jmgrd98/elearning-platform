import prismadb from "@/lib/prismadb";

export const GET = async () => {
    try {
        const doubts = await prismadb.doubt.findMany({
            include: {
                author: true
            }
        });
        return new Response(JSON.stringify(doubts), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}