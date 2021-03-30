import client from "../client";

export default {
  Query: {
    seeProfile: (_, { username }) =>
      //find @unique in schema.prisma
      client.user.findUnique({
        where: {
          username,
        },
      }),
  },
};
