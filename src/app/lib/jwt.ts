import jwt, { SignOptions } from "jsonwebtoken";

export function signToken(payload: Object) {
    const secret = process.env.JWT_SECRET as string;
    
    // Define the options object with the correct type
    const options: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRES as string || "1d") as any,
    };

    return jwt.sign(payload, secret, options);
}