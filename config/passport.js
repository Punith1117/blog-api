const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { getUserByUsername } = require('../prisma/queries')

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

passport.use(new JwtStrategy(opts, async function(payload, done) {
    let user
    try {
        user = await getUserByUsername(payload.username)
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch(err) {
        return done(err, false);
    }
}));

module.exports = passport