const schema = `
type User {
  id: String!
  firstName: String!
  lastName: String!
  email: String!
  lastSeen: String
  salt: String!
  hashedPassword: String!
}
`
export default schema
