import UserDesignModel from "@/db/models/userDesignModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      throw { message: "Please login first", status: 401 };
    }

    const result = await UserDesignModel.voteUserDesign(id, userId, 1);
    return Response.json({ message: result }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
