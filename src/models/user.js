import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const userScema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true
    }
}, {timestamps: true})

userScema.pre('save', function(next){
    const user = this;
    const SALT = bcrypt.genSaltSync(9);
    const encriptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encriptedPassword;
    next();
})

userScema.methods.comparePassword = function compare(password){
    return bcrypt.compareSync(password, this.password);
}

userScema.methods.genJWT = function generate(){
    return jwt.sign({id:this._id, email: this.email}, 'login_key',{
        expiresIn: '1h'
    })
}

const User = mongoose.model('User', userScema)

export default User