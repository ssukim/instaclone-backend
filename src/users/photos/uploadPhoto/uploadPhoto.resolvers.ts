import { Resolvers } from "../../../types";
import { protectedResolver } from "../../users.utils";

const resolvers:Resolvers = {
    Mutation: {
        uploadPhoto: protectedResolver(
            async (_, {file, caption}, {loggedInUser}) => {
                if(caption) {
                    //parse caption
                    //get or create Hashtags
                }
                //save the photo WITH the parsed hashtags
                //add the photo to the hashtags
            }
        )
    }
}

export default resolvers