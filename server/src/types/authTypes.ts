// SignupRequestBody interface for the request body of the signup route
export interface SignupRequestBody {
    email: string;
    firstName: string;
    lastName: string;
    password: string; 
    role?: string; // Optional field
}

// LoginRequestBody interface for the request body of the login route
export interface LoginRequestBody {
    email: string;
    password: string;
}

// VerifyEmailRequestBody interface for the request body of the verify email route
export interface VerifyEmailRequestBody {
    email: string;
    verificationCode: string;
}