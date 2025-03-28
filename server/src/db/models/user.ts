import {Schema, model, Document} from 'mongoose';

export interface IUser extends Document {
    email: string;
    firstName?: string;
    lastName?: string;
    password?: string; // Optional for OAuth users
    role: string;
    isVerified: boolean;
    verificationCode?: string;
    verificationCodeExpires?: Date;
    signupForEmails: boolean; // opt into marketing emails
    googleId?: string; // For Google OAuth
    appleId?: string;  // For Apple OAuth
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        password: {
            type: String,
            select: false, // Don't return password by default
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationCode: {
            type: String,
        },
        verificationCodeExpires: {
            type: Date,
        },
        signupForEmails: {
            type: Boolean,
            default: false,
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true, // Allows null values while keeping uniqueness
        },
        appleId: {
            type: String,
            unique: true,
            sparse: true,
        },
    },
    {
      timestamps: true, // Automatically adds createdAt and updatedAt
    }
  );

  // Export the model and return the IUser interface
  const User = model<IUser>('User', UserSchema); 
  export default User;