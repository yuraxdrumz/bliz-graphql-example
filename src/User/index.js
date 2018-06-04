import resolvers from './resolver'
import schema from './schema'

export default function UserSchema (app) {
  const checkEmail = `@email(regex: ".*gmail.com$")`
  return app
    .createGraphQlSchema(schema)
    .resolver(resolvers)
    .query(`getUser: User @auth @limit(use: "getUserLimit")`)
    .mutation(`newUser(input: newUser ${checkEmail}): User`)
    .mutation(`updateUser(input: updateUser ${checkEmail} @auth): String`)
    .mutation(`login(input: login ${checkEmail}): String`)
    .dataLoader({name: 'getUser', fn: injected => injected.getUser})
}
