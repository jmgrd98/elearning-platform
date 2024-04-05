import { connectToDB } from "@utils/database";

export const GET = async (req: any) => {
    try {
        await connectToDB();

        const doubts = await Doubt.find({}).populate("creator");
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}