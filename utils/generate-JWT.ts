import jsonwebtoken from 'jsonwebtoken'
import fs from 'fs'

import {TUser} from '../types/user'

const privateKey = fs.readFileSync('./private.key', 'utf-8')

export default function generateJWT(user: TUser) {
  const _id = user._id

  const expiresIn = '1d'

  const payload = {
    sub: _id,
    iat: Date.now(),
  }

  const signedToken = jsonwebtoken.sign(payload, privateKey, {
    expiresIn: expiresIn,
    algorithm: 'RS256',
  })

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
  }
}
