
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
`
export default schema
