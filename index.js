import bliz from 'bliz'
import UserSchema from './src/User'
import mongoose from 'mongoose'
import User from './src/User/db.model'
import { insertNewUser, getUserByEmail, getUserById } from './src/User/db.functions'
import { emailValidator, mongoIdValidator } from './src/directives'
mongoose.connect('mongodb://localhost/bliz-graphql-example')

const db = mongoose.connection;

db.on('open', async ()=> {
    const app = bliz()
    app
    .graphql({useGraphql: true, useGraphiql: true})
    .registerGraphQlSchemas(UserSchema)
    .directive({name: 'email', fn: emailValidator})
    .directive({name: 'mongoId', fn: mongoIdValidator(mongoose)})
    .inject({
        insertNewUser: insertNewUser(User),
        getUserById: getUserById(User),
        getUserByEmail: getUserByEmail(User)
    })
    .listen(4003)
})
