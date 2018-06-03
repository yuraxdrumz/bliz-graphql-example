const resolvers = {
  Query:{
    getUser(root, args, context, info){
      return args
    }
  },
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
    }
  }
}

export default resolvers