import bliz from 'bliz'
import UserSchema from './src/User'
import mongoose from 'mongoose'
import User from './src/User/db.model'
import config from './src/config'
import jwt from 'jsonwebtoken'
import { insertNewUser, getUser, updateUser, login } from './src/User/db.functions'
import { emailValidator, mongoIdValidator, auth, hasRole } from './src/directives'
mongoose.connect('mongodb://localhost/bliz-graphql-example')

const db = mongoose.connection;

db.on('open', async ()=> {
    const app = bliz()
    app
    .graphql({useGraphql: true, useGraphiql: true})
    .registerGraphQlSchemas(UserSchema)
    .enum({name: 'Role', options:['Admin', 'User']})
    .directive({name: 'email', fn: emailValidator})
    .directive({name: 'mongoId', fn: mongoIdValidator(mongoose)})
    .directive({name: 'auth', fn: auth(jwt, config)})
    .directive({name: 'hasRole', fn: hasRole})
    .inject({
        insertNewUser: insertNewUser(User),
        getUser: getUser(User),
        updateUser: updateUser(User, jwt, config),
        login: login(User, jwt, config)
    })
    .listen(4003)
})
