import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User, { IUser } from "../db/models/user";
import { SignupRequestBody, LoginRequestBody, VerifyEmailRequestBody } from "../types/authTypes";



export const signup = async (
    req: Request<{}, {}, SignupRequestBody>, res: Response): Promise<void> => {
        const { email, firstName, lastName, password, role} = req.body

    try {
        // Check if user with email already exists
        const existingUser: IUser | null = await User.findOne({email})

        // If user with email already exists, return error
        if (existingUser) {
            res.status(StatusCodes.CONFLICT).json({
                message: "User with email already exists",
            });
            return;
        }

        // Create a new user
        const newUser: IUser = await User.create({
            email,
            firstName,
            lastName,
            password,
            role: role || 'user',
            isVerified: false
        });

        
        res.status(StatusCodes.OK).json({ message: "Signup successful" });
        
    } catch (error) {
        // Check if error is an instance of Error and log the error message
        const err = error instanceof Error ? error : new Error('Unknown error'); 

        console.error('Signup error:', err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to sign up',
            error: err.message,
        });
    }
}

export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        // Find user with email
        const user: IUser | null = await User.findOne({ email });

        // If user not found, return error
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found",
            });
            return;
        }

        // Check if password is correct

        // Return success message
        res.status(StatusCodes.OK).json({
            message: "Login successful",
        });
    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');

        console.error("Signup error:", err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to sign up",
            error: err.message,
        });
    }
}

export const verifyEmail = async (req: Request<{}, {}, VerifyEmailRequestBody>, res: Response): Promise<void> => {
    const { email, verificationCode } = req.body;

    try {
        // Find user with email
        const user: IUser | null = await User.findOne({ email });

        // If user not found, return error
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found",
            });
            return;
        }

        // Check if verification code is correct
        if(user.verificationCode !== verificationCode) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Invalid verification code",
            });
            return;
        }

        // Check if verification code has expired
        if (!user.verificationCodeExpires || user.verificationCodeExpires < new Date()) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Verification code expired" });
            return;
        }

        // Update user to be verified
        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpires = undefined;
        await user.save();

        // Return success message
        res.status(StatusCodes.OK).json({
            message: "Email verified successfully",
        }); 

    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');

        console.error("Signup error:", err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to sign up",
            error: err.message,
        });
    } 
}