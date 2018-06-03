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

const updateUser = UserModel => async ([{id, email, firstName, lastName, password}]) => {
    const user = await UserModel.findOne({$or:[{email}, {_id:id}]})
    if(user){
        Object.assign(user, {email, firstName, lastName, password, lastSeen: Date.now()})
        const data = await user.save()
        return data
    } else {
        throw new Error(`User with email: ${email}, was not found`)
    }
}

const login = UserModel => async ([{email, password}]) => {
    const user = await UserModel.findOne({email})
    if(user){
        const passwordIsAuth = await user.comparePassword(password)
        if(passwordIsAuth){
            return 'logged in jwt ...'
        }else {
            throw new Error('Password is incorrect...')
        }
    }else {
        throw new Error(`User with email: ${email}, was not found`)
    }
}

export {
    insertNewUser,
    getUserById,
    getUserByEmail,
    updateUser,
    login
}
