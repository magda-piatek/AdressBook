import bcrypt from 'bcryptjs'

import {TUser} from '../types/user'

export default async function checkValidPassword(
  password: string,
  user: TUser
) {
  const validPassword = await bcrypt.compare(password, user.password)
  return validPassword
}
