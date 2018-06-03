import bliz from 'bliz'
import UserSchema from './src/User'
import mongoose from 'mongoose'
import User from './src/User/db.model'
import { insertNewUser } from './src/User/db.functions'
mongoose.connect('mongodb://localhost/bliz-graphql-example')

const db = mongoose.connection;

db.on('open', async ()=> {
    const app = bliz()
    app
    .graphql({useGraphql: true, useGraphiql: true})
    .registerGraphQlSchemas(UserSchema)
    .inject({
        insertNewUser: insertNewUser(User)
    })
    .listen(4003)
})

