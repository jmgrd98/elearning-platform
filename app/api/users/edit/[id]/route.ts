import prismadb from "@/lib/prismadb";

export const PATCH = async (req: any) => {
    try {
        const { id } = req.params;
        const { fieldToUpdate, valueToUpdate } = await req.json();
        const updatedUser = await prismadb.user.update({
            where: { id },
            data: {
                [fieldToUpdate]: valueToUpdate,
            },
        });
        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
