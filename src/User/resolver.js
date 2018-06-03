const resolvers = {
  Query:{
    getUser(root, args, context, info){
      return args
    }
  },
  Mutation:(pubsub)=>({
    newUser: (user, args, context, info) => {
      return context.insertNewUser(args.input)
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