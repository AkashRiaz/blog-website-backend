import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const sign = jwt.sign;
const hash = bcrypt.hash;
const compare = bcrypt.compare;

const UserSchema = new Schema({
    avatar: {type: String, default: ""},
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    verified: {type:Boolean, default: false},
    verificationCode: {type: String, required : false},
    admin: {type: Boolean, default: false},
}, {timestamps: true})

UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await hash(this.password, 10)
        return next()
    }
} )

UserSchema.methods.comparePassword = async function(enteredPassword){
    return await compare(enteredPassword, this.password)
}

UserSchema.methods.generateJWT = async function(){
    return sign({id: this._id}, process.env.JWT_SECRET_KEY, {expiresIn: "30d"} )
}

const User = model("User", UserSchema)

export default User;