import { Request, Response ,NextFunction, RequestHandler } from "express"


export const TryCatch = (fn:RequestHandler) :RequestHandler => {

    return async (req:Request, res:Response , next:NextFunction)=>{
        try {
            await fn(req, res , next)
        } catch (error:any) {
            console.log("Error : " , error);
            
            res.status(500).json({
                message:`Error : ${error.message}`
            })
        }
    }
} 

export default TryCatch;
