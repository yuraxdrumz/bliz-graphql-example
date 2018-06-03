import resolvers from './resolver'
import schema from './schema'

export default function UserSchema (app) {
  return app
    .createGraphQlSchema(schema)
    .resolver(resolvers)
    .query(`getUser(id: String!): User`)
    .mutation(`newUser(input: newUser @emailValidator(regex: ".*gmail.com$")): User`)
    .dataLoader({name: 'getUser', fn: injected => injected.getUser})
}