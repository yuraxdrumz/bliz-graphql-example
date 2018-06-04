export function emailValidator({ directiveArgs, resolve, source, args, context, info }) {
    const regex = new RegExp(directiveArgs.regex)
    const email = (args.input && args.input.email) || args.email
    if(!regex.test(email)){
        throw new Error(`Email must match regex: ${directiveArgs.regex}`)
    } else {
        return resolve(source, args, context, info)
    }
}

export function mongoIdValidator(mongoose){
    return function ({ directiveArgs, resolve, source, args, context, info }) {
        const id = (args.input && args.input.id) || args.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error(`Not a mongoose id: ${id}`)
        } else {
            return resolve(source, args, context, info)
        }
    }
}

export function auth(jwt, config){
    return function({ directiveArgs, resolve, source, args, context, info }) {
        const authHeader = context.headers.authorization || context.headers.Authorization 
        if(!authHeader){
            throw new Error(`Authorization header is required`)
        } else {
            const user = jwt.verify(authHeader, config.secret)
            Object.assign(context, {user})
            return resolve(source, args, context, info)
        }
    }
}

export function hasRole({ directiveArgs, resolve, source, args, context, info }) {
    const role = (args.input && args.input.role) || args.role
    if(role !== directiveArgs.role){
        throw new Error(`Not Authorized`)
    } else {
        return resolve(source, args, context, info)
    }
}

export function limit({ directiveArgs, resolve, source, args, context, info }) {
    const use = directiveArgs.use
    if(!context.limits[use]){
        throw new Error('strategy not defined')
    } else {
        if(context.limits[use].tokens === 0){
            throw new Error('Too many requests, try again later...')
        }
        context.limits[use].tokens -= 1
        return resolve(source, args, context, info)
    }
}