const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, async(jwt_payload, done) =>{
        try {
            const user = await User.getUserById(jwt_payload.data._id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
          } catch (err) {
            console.error(err);
            res.status(500).send('Error fetching user');
          }
    }));
}