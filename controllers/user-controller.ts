import express, {Response} from 'express'

import {TUser} from '../types/user'
import {IRequest} from '../interfaces/request'
import User from '../models/User'
import generatePassword from '../utils/generate-password'
import generateJWT from '../utils/generate-JWT'

export const register = async (req: IRequest<TUser>, res: Response) => {
  const {email, password} = req.body

  try {
    let user = await User.findOne({email})

    if (user) {
      res.status(400).json({error: 'User already exists'})
      return
    }

    user = new User({email, password})
    user.password = await generatePassword(password)

    const newUser = await user.save()

    const jwt = generateJWT(newUser)

    res.json({
      success: true,
      user: newUser,
      token: jwt.token,
      expiresIn: jwt.expires,
    })
  } catch (err) {
    console.log(err)

    res.status(500).send({error: err})
  }
}
