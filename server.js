require('dotenv').config();

import { ApolloServer } from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({
    schema,
    context: {
        token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3MTU3MjE4fQ.0ml3U_aGQz765-OKqVtwrJTlqYroQXo-8yO1GAq6AZU"
    }
});

const PORT = process.env.PORT;

server
.listen(PORT)
.then(() => console.log(`👍 Server is running on http://localhost:${PORT}/`));