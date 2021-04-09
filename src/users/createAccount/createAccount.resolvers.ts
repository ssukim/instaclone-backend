import * as bcrypt from "bcrypt";
import client from "../../client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: protectedResolver(
      async (_, { firstName, lastName, email, password, username }) => {
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

        if (existingUser) {
          return {
            ok: false,
            error: "This username/password is already taken.",
          };
        }

        // hash password
        const uglyPassword = await bcrypt.hash(password, 10);

        // save and return the user
        await client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
