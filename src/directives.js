export function emailValidator({ directiveArgs, resolve, source, args, context, info }) {
    const regex = new RegExp(directiveArgs.regex)
    if(!regex.test(args.input.email)){
        throw new Error(`Email must match regex: ${directiveArgs.regex}`)
    } else {
        return resolve(source, args, context, info)
    }
}