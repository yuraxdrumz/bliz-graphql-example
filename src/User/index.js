import resolvers from './resolver'
import schema from './schema'

export default function UserSchema (app) {
  const checkEmail = `@email(regex: ".*gmail.com$")`
  return app
    .createGraphQlSchema(schema)
    .resolver(resolvers)
    .query(`getUserById(id: String! @mongoId): User`)
    .query(`getUserByEmail(email: String! ${checkEmail}): User`)
    .mutation(`newUser(input: newUser ${checkEmail}): User`)
    .mutation(`updateUser(input: updateUser ${checkEmail}): User`)
    .mutation(`login(input: login ${checkEmail}): String`)
    .dataLoader({name: 'getUserById', fn: injected => injected.getUserById})
    .dataLoader({name: 'getUserByEmail', fn: injected => injected.getUserByEmail})
}
