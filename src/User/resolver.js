const resolvers = {
  Query:{
    getUser(root, args, context, info){
      return context.getUser.load([context.user.email])
    },
  },
  Mutation:(pubsub)=>({
    newUser: (user, args, context, info) => {
      return context.insertNewUser(args.input)
    },
    updateUser: (user, args, context, info) => {
      context.getUser.clear(context.user.email)
      const data = args.input
      return context.updateUser([data])
    },
    login: (user, args, context, info) => {
      return context.login([args.input])
    }
  }),
  User:{
    id(user, args, context, info){
      return user.id
    },
    firstName(user, args, context, info){
      return user.firstName
    },
    lastName(user, args, context, info){
      return user.lastName
    },
    email(user, args, context, info){
      return user.email
    },
    lastSeen(user, args, context, info){
      return user.lastSeen
    },
    role(user, args, context, info){
      return user.role
    },    
    salt(user, args, context, info){
      return null
    },
    hashedPassword(user, args, context, info){
      return null
    },
  }
}

export default resolvers