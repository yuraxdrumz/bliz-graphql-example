const insertNewUser = UserModel => (user) => {
    let newUser = new UserModel(user)
    newUser.lastSeen = Date.now()
    return newUser.save()
}

const getUser = (UserModel) => async ([email]) => {
    const [user] = await UserModel.find({email})
    if(user){
        return [user]
    } else {
        throw new Error(`User with email: ${email}, was not found`)
    }
}

const updateUser = (UserModel, jwt, config) => async ([{id, email, firstName, lastName, password}]) => {
    const user = await UserModel.findOne({$or:[{email}, {_id:id}]})
    if(user){
        Object.assign(user, {email, firstName, lastName, password, lastSeen: Date.now()})
        const newUser = await user.save()
        return jwt.sign({email: newUser.email, firstName:newUser.firstName, lastName:newUser.lastName}, config.secret, {expiresIn: '4h'})
    } else {
        throw new Error(`User with email: ${email}, was not found`)
    }
}

const login = (UserModel, jwt, config) => async ([{email, password}]) => {
    const user = await UserModel.findOne({email})
    if(user){
        const passwordIsAuth = await user.comparePassword(password)
        if(passwordIsAuth){
            return jwt.sign({email: user.email, firstName:user.firstName, lastName:user.lastName}, config.secret, {expiresIn: '4h'})
        }else {
            throw new Error('Username or Password is incorrect...')
        }
    }else {
        throw new Error(`User with email: ${email}, was not found`)
    }
}

export {
    insertNewUser,
    getUser,
    updateUser,
    login
}
