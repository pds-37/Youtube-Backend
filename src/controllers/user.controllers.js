import {asynchandler} from "../utils/asynchandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
// Method to register user

const registerUser = asynchandler(async (req,res)=> {
    // get user details from frontend.
   //  validation--> not empty.
  //   check if user already exists or not--> can be chked thru username or email.
 //    check for images and chk for avatars...if available upload them on cloudinary.
/*     To chk whether avatar is uploade successfully on cloudinary , then create user object--> create entry in db.....
       remove password nd refresh token from response.
       chk whether response come or not , and if no response come chk user created or not and if not throw error....*/


//--> To get user details-->
      const {fullName,email,username,password} = req.body
      console.log("email:", email);

    /* if(fullName === ""){
        throw new ApiError(400, "fullname is required")
      }

*/
// checking all fields at once.
    if(
      [fullName,email,username,password].some((field) => field?.trim() === "")
    ){
      throw new ApiError(400, "All field are compulsory")
    }

// to chk user already exist or not:_>
    const existedUser = User.findOne({
      $or: [{ username },{ email }]

    })

    if(existedUser){
      throw new ApiError(409, "User with given username or email already exist.")
    }
    console.log(existedUser);

// to check images  // here ? means taking optionally
   const avatarLocalPath = req.files?.avatar[0]?.path

   const coverLocalPath = req.files?.avatar[0]?.path

   if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is required")
   }


//Uploading avatar and coverimage on cloudinary




})




export {registerUser, }