import {asynchandler} from "../utils/asynchandler.js"


// Method to register user

const registerUser = asynchandler(async (req,res)=> {

 return res.status(200).json({
    message: "ok"
  })

})


export {registerUser, }