import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
    const body = await req.json();
    console.log(body)
    try {
        const newDoubt = await prismadb.doubt.create({
            data: {
                ...body
            }
        });
        return new Response(JSON.stringify(newDoubt), { status: 201 });
    } catch (error: any) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}