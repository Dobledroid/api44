import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { dbSettings } from './database/connection';
require('dotenv').config();
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRECT_JWT,
};

passport.use(new Strategy(options, async (jwt_payload, done) => {
  try {
    // Aquí puedes realizar la verificación del usuario, por ejemplo, consultando la base de datos
    // y comprobando si el usuario asociado al JWT existe y está autorizado

    // Si el usuario existe y está autorizado:
    return done(null, jwt_payload);

    // Si el usuario no existe o no está autorizado:
    // return done(null, false);
  } catch (error) {
    console.error('Error al autenticar usuario:', error);
    return done(error, false);
  }
}));

export default passport;
