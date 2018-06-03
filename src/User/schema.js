
const schema = `
type User {
  id: String!
  firstName: String!
  lastName: String!
  email: String!
  lastSeen: String!
  salt: String
  hashedPassword: String
}
input newUser {
  firstName: String!
  password: String!
  lastName: String!
  email: String!
}
input updateUser {
  firstName: String
  password: String
  lastName: String
  email: String
}
input login{
  email: String!
  password: String!
}
`
export default schema
