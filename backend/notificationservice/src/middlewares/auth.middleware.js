import jsontoken from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.get('Authorization');
    const internalToken = process.env.INTERNAL_SERVICE_TOKEN || 'internal-service-token';

    if (!authHeader) {
        return res.status(401).json({
            status: "Not Authorized",
            error: "Authorization Header Not Found!!",
        });
    }

    const token = authHeader.split(' ')[1];


    console.log("Authorization Header:=================>", authHeader, token);

    if (!token) {
        return res.status(401).json({
            status: "Not Authorized",
            error: "Token is missing",
        });
    }

    if (token === internalToken) {
        req.user = { id: 'internal-service', service: 'ticketservice' };
        return next();
    }

    try {
        const decodedToken = jsontoken.verify(token, process.env.JWT_SECRET || 'aisuportsecret');
        req.user = decodedToken;
        return next();
    } catch (err) {
        return res.status(401).json({
            status: "Not Authorized",
            error: "Invalid or expired token",
        });
    }
};