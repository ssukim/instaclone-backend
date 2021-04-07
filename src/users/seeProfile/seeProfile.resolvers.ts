import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Query: {
    seeProfile: protectedResolver((_, { username }, { client }) =>
      //find @unique in schema.prisma
      client.user.findUnique({
        where: {
          username,
        },
        include: {
          following: true,
          followers: true,
        }
      })
    ),
  },
};

export default resolvers;
