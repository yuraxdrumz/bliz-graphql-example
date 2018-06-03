const insertNewUser = UserModel => (user) => {
    let newUser = new UserModel(user)
    newUser.lastSeen = Date.now()
    return newUser.save()
}

export {
    insertNewUser
}