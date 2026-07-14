import * as z from "zod";
import { hashSync } from "bcryptjs";
import { database } from "@/app/db/config/mongoDb";

const UserSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long" }),
    name: z.string().min(1, { message: "Name is required" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
});


export default class UserModel {
    
    static collection(){
        return database.collection("users")
    }

    static async findByEmail(email: string){
        const user = await this.collection().findOne({email: email})
        return user

    }
    
    static async register(userData: z.infer<typeof UserSchema>)
    {
        const parsedData = UserSchema.parse(userData)
        const existingUser = await this.collection().findOne({
            email: parsedData.email
        })

        if(existingUser)
        {
            throw {message: "Email already exists", status: 400}
        }

        parsedData.password = hashSync(parsedData.password, 10)

        const result = await this.collection().insertOne(parsedData)
        return {msg: "User created with ID: " + result.insertedId, insertedId: result.insertedId}
    }
}