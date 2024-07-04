import jwt from 'jsonwebtoken';
require('dotenv').config();

export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  // console.log("token", token)

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acceso no autorizado. Token no proporcionado.' });
  }

  const tokenValue = token.split(' ')[1];
  // console.log("tokenValue", tokenValue);

  jwt.verify(tokenValue, process.env.SECRECT_JWT, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(419).json({ message: 'La sesión ha expirado debido a la caducidad del token' });
      } else {
        return res.status(403).json({ message: 'Token inválido' });
      }
    }
    req.user = user; 
    // console.log("middleware", user);
    next();
  });
};


export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'Administrador') {
    return res.status(403).json({ message: 'Acceso no autorizado. Se requieren permisos de administrador.' });
  }
  next();
};
