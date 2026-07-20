import errorHandler from "@/app/helpers/errorHandler";
import ProductModel from "@/db/models/productModel";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }){
    try {
        const {id} = await params
        const body = await req.json()
        const res = await ProductModel.putProduct(body, id)
        return Response.json(res)
    } catch (error) {
        return errorHandler(error)
    }
}