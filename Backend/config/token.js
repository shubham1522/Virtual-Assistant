import jwt from "jsonwebtoken"

const genToken = async(userId) => {
    if (!userId) {
        throw new Error('User ID is required to generate token');
    }
    
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
    }

    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error('Failed to generate authentication token');
    }
}

export default genToken;
		
