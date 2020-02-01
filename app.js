const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose")

const grapQlSchema = require('./graphql/schema')
const rootResolvers = require('./graphql/resolvers/index')
const app = express();
const isAuth = require("./middleware/is-auth")
app.use(bodyParser.json());

app.use(isAuth)


app.use('/graphql', graphqlHttp({
    schema: grapQlSchema,
    rootValue: rootResolvers,
    graphiql: true
}));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true); mongoose.connect(
    `mongodb://localhost:27017/${process.env.MONGO_DB}`
).
    then(() =>
        app.listen(3000)
    ).catch(err => {
        console.log(err)
    })

