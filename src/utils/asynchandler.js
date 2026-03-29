//Promise envoke and resolve.....f
const asynchandler = (requestHandler) => {
 (req,res,next)=> {
    Promise.resolve(requestHandler(req,res,next)).
    catch((err) => next(err))
 }
}


export {asynchandler}

//another way-->
/* const asynchandler = (fn) => async (req, res, next) => {
 try{

 }  catch(error){
    res.status(error.code || 500).json({
    success: false,
    message: err.message
    })
 }  

} */