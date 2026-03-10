import { Request, Response } from "express"
import { asyncHandler } from "../middlewares/asyncHandler.js"
import User from "../models/user.js"
import jwt from "jsonwebtoken"


export const loginController = asyncHandler(async (req, res )=>{
    
    const { name, email, picture} = req.body;
    

    if(!name || !email || !picture){
        return res.status(400).json({
            message:"email name and picture required"
        })
    }

    let existedUser = await User.findOne({email})

    if(!existedUser){
        existedUser = await User.create({
            name,
            email,
            image:picture
        })
    }

    const token = jwt.sign({existedUser}, process.env.JWT_SECRET as string , {
        expiresIn:"15d",
    })

    return res.status(201).json({
        message:"Logged in Succesfully",
        token,
        existedUser
    })

})







export const allowedRoles = ["customer" , "rider", "seller"] as const

type Role = (typeof allowedRoles )[]

