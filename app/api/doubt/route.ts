import prismadb from "@/lib/prismadb";

export const GET = async () => {
    const doubts = await prismadb.doubt.findMany();
    return new Response(JSON.stringify(doubts), { status: 200 });
}