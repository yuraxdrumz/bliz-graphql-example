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
        if(!mongoose.Types.ObjectId.isValid(args.id)){
            throw new Error(`Not a mongoose id: ${args.id}`)
        } else {
            return resolve(source, args, context, info)
        }
    }
}