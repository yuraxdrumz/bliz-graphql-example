const resolvers = {
  Query:{
    getUserById(root, args, context, info){
      return context.getUserById.load([args.id])
    },
    getUserByEmail(root, args, context, info){
      return context.getUserByEmail.load([args.email])
    }
  },
  Mutation:(pubsub)=>({
    newUser: (user, args, context, info) => {
      return context.insertNewUser(args.input)
    },
    updateUser: (user, args, context, info) => {
      if(args.id){
        context.getUserById.clear(args.id)
      }
      if(args.email){
        context.getUserByEmail.clear(args.email)
      }
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
    salt(user, args, context, info){
      return null
    },
    hashedPassword(user, args, context, info){
      return null
    },
  }
}

export default resolvers