import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({

  username:{
    type : String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },

  email:{
    type : String,
    required: true,
    unique: true,

  },

  fullName:{
    type : String,
    required: true,
    trim: true,
    index: true
    
  },

  avatar: {
    type: String, // CLoudinary url 
    required: true,


  },

  coverimage: {
    type: String,
  },

  watchHistory:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }

  ],

  password:{
    type: String,
    required: [true, 'Password is required']
  },

  refreshToken: {
    type: String
  }


}, {timestamps : true})

// we generally not use arrow function here bcz here this have no reference to current scenario and that may cause issues...

userSchema.pre("save",async function (next) {
   if(!this.isModified("password")) return next();

   this.password= bcrypt.hash(this.password, 10) // bcrypt(what to hash, and how many rounds)
   next();

} ) 

// we cab design custom message in mongoose
// creation of own method -> isPasswordCorrect
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password) // password --> from user, this.password--> encrypted one
}


userSchema.methods.genearetAccessToken = function () {
  return jwt.sign({
    _id: this._id,  // key: db value
    email: this.email,  // key: db value
    username: this.username,  // key: db value
    fullName: this.fullName  // key: db value
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn:  process.env.ACCESS_TOKEN_EXPIRY
  },

)
}



userSchema.methods.genearetRefreshToken = function () {
   return jwt.sign({
    _id: this._id,  // key: db value

  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn:  process.env.REFRESH_TOKEN_EXPIRY
  },

)
}


export const User= mongoose.model("User", userSchema)