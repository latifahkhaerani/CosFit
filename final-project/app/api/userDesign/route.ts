import UserDesignModel from "@/app/db/models/userDesignModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function GET(){
    try {
        const result = await UserDesignModel.getAllUserDesigns()
        return Response.json(result)
    }catch (error) {
        return errorHandler(error)
    }
}

export async function POST(req: Request){
    const body = await req.json();
    const userId = req.headers.get("x-user-id") as string;
    try {
        const result = await UserDesignModel.createUserDesign(body, userId);
        return Response.json({ message: result }, { status: 201 });
    } catch (error) {
        return errorHandler(error);
    }
}

export async function PATCH(req: Request, {params}: {params: Promise<{id: string}>}){
    try {
        const { id } = await params;
        const result = await UserDesignModel.voteUserDesign(id, 1);
        return Response.json({ message: result }, { status: 200 });        
    } catch (error) {
        return errorHandler(error)
    }
}