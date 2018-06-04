
const schema = `
type User {
  id: String!
  firstName: String!
  lastName: String!
  email: String!
  lastSeen: String!
  salt: String
  role: Role! @hasRole(role: "Admin")
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
