import bliz from 'bliz'
import UserSchema from './src/User'
import mongoose from 'mongoose'
import User from './src/User/db.model'
import { insertNewUser, getUser } from './src/User/db.functions'
import { emailValidator } from './src/directives'
mongoose.connect('mongodb://localhost/bliz-graphql-example')

const db = mongoose.connection;

db.on('open', async ()=> {
    const app = bliz()
    app
    .graphql({useGraphql: true, useGraphiql: true})
    .registerGraphQlSchemas(UserSchema)
    .directive({name: 'emailValidator', fn: emailValidator})
    .inject({
        insertNewUser: insertNewUser(User),
        getUser: getUser(User)
    })
    .listen(4003)
})

