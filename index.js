import bliz from 'bliz'
import UserSchema from './src/User'

const app = bliz()

app
.graphql({useGraphql: true, useGraphiql: true})
.registerGraphQlSchemas(UserSchema)
.listen(4003)