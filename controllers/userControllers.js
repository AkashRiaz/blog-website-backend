import User from "../models/User.js";

const resisterUser = async (req, res, next)=>{
    try {
        const {name, email, password} = req.body;

        // check whether user already exists or not
        let user = await User.findOne({email})
        if(user){
            // return res.status(400).json({message: "User is already registered"})
            throw new Error("User is already registered")
        }
        // create new user
        user = await User.create({name, email, password})

        return res.status(201).json({
           _id: user._id,
           avatar: user.avatar,
           name:user.name,
           email: user.email,
           verified: user.verified,
           admin: user.admin,
           token:await user.generateJWT()
        })
    } catch ( error) {
        // return res.status(500).json({message: "Something went wrong"})
        next(error) // this will call the errorHandler middleware
    }
}

export {resisterUser}