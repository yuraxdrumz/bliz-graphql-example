const insertNewUser = UserModel => (user) => {
    let newUser = new UserModel(user)
    newUser.lastSeen = Date.now()
    return newUser.save()
}

const getUserById = UserModel => async ([id]) => {
    const [user] = await UserModel.find({_id:id})
    if(user){
        return [user]
    } else {
        throw new Error(`User with id: ${id}, was not found`)
    }
}

const getUserByEmail = UserModel => async ([email]) => {
    const [user] = await UserModel.find({email})
    if(user){
        return [user]
    } else {
        throw new Error(`User with email: ${email}, was not found`)
    }
}

export {
    insertNewUser,
    getUserById,
    getUserByEmail
}