import mongoose,{Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema =new Schema({
username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,   
},
fullname:{
    type:String,
    required:true,
    trim:true,
    index:true
},
avatar:{
    type:String, //use cloudinary url
    required:true,
},
coverImage:{
    type:String //cloudinary url
},
watchHistiory:[
    {
        type:Schema.Types.ObjectId,
        ref:"Video"
    }
],
password:{
    type:String,
    required:[true,'Password is required']
},
refreshToken:{
    type:String
}
},{timestamps:true})

//password encrypt logic
userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();
    
    this.password = bcrypt.hash(this.password,10) //else
    next()
})
userSchema.methods.isPasswordCorrect = async function 
(password) {
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.genrateAccessToken= function(){
    return jwt.sign(
        {
             _id:this._id,
             email:this.email,
             username:this.username,
             fullname:this.fullname 
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.genrateRefreshToken= function(){
    return jwt.sign(
        {
             _id:this._id,
             email:this.email,
             username:this.username,
             fullname:this.fullname 
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User =mongoose.model("User",userSchema);