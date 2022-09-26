const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Minimum length is 6 characters']
    }
});

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();    
});

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email });
    if(user){
       const auth = await bcrypt.compare(password, user.password);
       if(auth){
        return user;
       }
       throw Error('Incorrect email and/password')
    }
    throw Error('Incorrect email and/password')
}

const User = mongoose.model('user', userSchema);

module.exports = User;