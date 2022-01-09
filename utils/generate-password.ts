import bcrypt from 'bcryptjs'

export default async function generatePassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  return hash
}
