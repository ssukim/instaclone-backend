import bcrypt from "bcrypt"
import client from "../client"

export default {
    Mutation: {
        createAccount: async (_, {
            firstName,
            lastName,
            email,
            password,
            username
        }) => {
            // check if username or email are already on DB
            const existingUser = await client.user.findFirst({
                where: {
                    OR: [
                        {
                            username,
                        },
                        {
                            email,
                        },
                    ],
                },
            });
            // hash password
            const uglyPassword = await bcrypt.hash(password, 10);
            console.log(uglyPassword)
            // save and return the user
        },
    }
}