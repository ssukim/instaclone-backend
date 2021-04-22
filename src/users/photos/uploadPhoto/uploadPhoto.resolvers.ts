import client from "../../../client";
import { Resolvers } from "../../../types";
import { protectedResolver } from "../../users.utils";
import { processHashtags } from "../photos.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = [];
        if (caption) {
          //parse caption
          //get or create Hashtags
          hashtagObj = processHashtags(caption);
        }
        //save the photo WITH the parsed hashtags
        return client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });
        //add the photo to the hashtags
      }
    ),
  },
};

export default resolvers;
