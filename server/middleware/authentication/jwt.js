const passport = require("passport");
const passportJwt = require("passport-jwt");
const User = require("../../models/User");

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env.JWT_SIGNING_KEY,
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE
};

passport.use(
  new passportJwt.Strategy(jwtOptions, async (payload, done) => {
    const user = await User.getUserById(payload.sub);
    if (user) {
      return done(null, user, payload);
    }
    return done();
  })
);
