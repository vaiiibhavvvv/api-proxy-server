import dotenv from 'dotenv';

dotenv.config();

export const authenticate = (req, res, next) => {
    try {
        const token = req.header('Authorization');

        // Check if the token is provided
        if (!token) {
            return res.status(401).json({ error: 'Access denied, no token provided' });
        }

        // Validate the token
        if (token !== process.env.AUTH_TOKEN) {
            return res.status(403).json({ error: 'Invalid token, access denied' });
        }

        // If everything is fine, proceed to the next middleware
        next();
    } catch (error) {
        // Handle any unexpected errors
        console.error(`Authentication error: ${error.message}`);
        res.status(500).json({ error: 'An error occurred during authentication' });
    }
};
