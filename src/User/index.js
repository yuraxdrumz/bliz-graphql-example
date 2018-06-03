import resolvers from './resolver'
import schema from './schema'

export default function UserSchema (app) {
  return app
    .createGraphQlSchema(schema)
    .resolver(resolvers)
    .query(`getUser(id: Int!): User`)
}