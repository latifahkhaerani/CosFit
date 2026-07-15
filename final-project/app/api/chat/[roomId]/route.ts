import errorHandler from "@/app/helpers/errorHandler";

export async function GET(req: Request, { params }: { params: Promise<{ roomId: string }> }) {
    try {
        const {roomId} = await params;
        
    } catch (error) {
        errorHandler(error)
    }
}

export async function POST(req: Request, { params }: { params: Promise<{ roomId: string }> }){
    try {
        const {roomId} = await params;
    } catch (error) {
        errorHandler(error)
    }
}