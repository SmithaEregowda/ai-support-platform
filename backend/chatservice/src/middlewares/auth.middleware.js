import jsontoken from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return res.status(401).json({
      status: 'Not Authorized',
      error: 'Authorization Header Not Found!!',
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 'Not Authorized',
      error: 'Token is missing',
    });
  }

  try {
    const decodedToken = jsontoken.verify(token, process.env.JWT_SECRET || 'aisuportsecret');
    req.user = decodedToken;
    return next();
  } catch (err) {
    return res.status(401).json({
      status: 'Not Authorized',
      error: 'Invalid or expired token',
    });
  }
};
