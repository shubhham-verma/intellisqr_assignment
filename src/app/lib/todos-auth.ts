import jwt from "jsonwebtoken";

export const verifyToken = (req: Request) => {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return null;

    const token = authHeader.replace("Bearer ", "");

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        return decoded;
    } catch (err) {
        return null;
    }
};
