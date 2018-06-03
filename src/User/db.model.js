
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Promise from 'bluebird'


Promise.promisifyAll(bcrypt)

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String },
    firstName: { type: String },
    lastName:{ type: String },
    salt: { type: String },
    lastSeen:{ type: Date }
});


userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSaltAsync(10)
    const hash = await bcrypt.hashAsync(user.password, salt)
    Object.assign(user, {salt, password: hash})
});

userSchema.methods.comparePassword = async password => {
    const compare = await bcrypt.compareAsync(password, this.password)
    return compare    
};

const User = mongoose.model('User', userSchema);

export default User