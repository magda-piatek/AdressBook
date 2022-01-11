import passport from 'passport'
import {Strategy as JwiStrategy, ExtractJwt} from 'passport-jwt'

import User from '../models/user'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: (process.env.PUBLIC_KEY as string).replace(/\\n/gm, '\n'),
  algorithms: ['RS256'],
}

const strategy = new JwiStrategy(options, async (payload, done) => {
  try {
    const user = await User.findOne({_id: payload.sub})

    if (user) return done(null, user)
    return done(null, false, {message: "User doesn't exist"})
  } catch (err) {
    return done(err)
  }
})

export default passport.use(strategy)
