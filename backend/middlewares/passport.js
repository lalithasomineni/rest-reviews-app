const User = require("../models/users");
const { SECRET } = require("../config");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { Passport } = require("passport");



const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
};

module.exports = passport => {
   
    passport.use(
        new Strategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user)
                }
                return done(null, false)
            })
            .catch(err => {
                console.log(err)
            });
        })
    )
}