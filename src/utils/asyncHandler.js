//ye communication krega db k saath ek method bana k 

//using promise:
// const asyncHandlerr =(requestHandler) =>{
//     (req,res,next)=>{
//         Promise.resolve(requestHandler(req,res,next)).
//         catch((error)=> next(error))
//     }
// }




const asyncHandler = (fn) => async (req,res,next) => {
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(error.code || 500).json({    //error code k saath jsom v send krtey hai
            success:false,
            message: error.message
        })

    }
}



7
export {asyncHandler}

















