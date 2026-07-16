import ProductModel from "@/app/db/models/productModel"
import errorHandler from "@/app/helpers/errorHandler"

export async function GET(req: Request, {params}: {params: Promise<{id: string}>})
{
    try {
        const {id} = await params
        const result = ProductModel.getById(id)
        return Response.json(result)
        
    } catch (error) {
        return errorHandler(error)
    }
}
