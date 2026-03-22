import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { authenticatedRequest } from "../middlewares/authMiddleware.js";
import { oauth2Client } from "../config/googleConfig.js";
import axios from "axios";

export const loginController = asyncHandler(async (req, res) => {

    const {code} = req.body;
    if (!code) {
        return res.status(400).json({
            message: "Authorization Code required",
        });
    }

    const googleRes = await oauth2Client.getToken(code)

    oauth2Client.setCredentials(googleRes.tokens)

    const userRes =  await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)

    // console.log(userRes);
    

    const { name, email, picture } = userRes.data;

    if (!name || !email || !picture) {
        return res.status(400).json({
            message: "email name and picture required",
        });
    }

    let user = await User.findOne({ email });

    console.log(user);
    

    if (!user) {
        user = await User.create({
            name,
            email,
            image: picture,
        });
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
        expiresIn: "15d",
    });

    return res.status(201).json({
        message: "Logged in Succesfully",
        token,
        user,
    });
});

const allowedRoles = ["customer", "rider", "seller"] as const;

type Role = (typeof allowedRoles)[number];

export const adduserRole = asyncHandler(
    async (req: authenticatedRequest, res) => {
        if (!req.user?._id) {
            res.status(401).json({
                message: "Unauthorized",
            });
            return;
        }
        const { role } = req.body as { role: Role };


        if (!allowedRoles.includes(role)) {
            res.status(401).json({
                message: "Invalid Role",
            });
            return;
        }

        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                role,
            },
            {
                new: true,
            },
        );

        if (!user) {
            res.status(404).json({
                message: "User Not Found ",
            });
        }

        const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
            expiresIn: "15d",
        });

        return res.status(201).json({
            user,
            token
        })
    },
);


export const myProfile = asyncHandler(async (req: authenticatedRequest, res) => {    
  const user = req.user;
  res.json(user);
});
