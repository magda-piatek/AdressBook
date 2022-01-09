import jsonwebtoken from 'jsonwebtoken'

import {TUser} from '../types/user'

export default function generateJWT(user: TUser) {
  const _id = user._id

  const expiresIn = '1d'

  const payload = {
    sub: _id,
    iat: Date.now(),
  }

  const signedToken = jsonwebtoken.sign(
    payload,
    (process.env.PRIVATE_KEY as string).replace(/\\n/gm, '\n'),
    {
      expiresIn: expiresIn,
      algorithm: 'RS256',
    }
  )

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
  }
}
