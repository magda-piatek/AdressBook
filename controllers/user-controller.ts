import {Response} from 'express'

import {TUser} from '../types/user'
import {IRequest} from '../interfaces/request'
import User from '../models/user'
import generatePassword from '../utils/generate-password'
import generateJWT from '../utils/generate-JWT'

export const postUser = async (req: IRequest<TUser>, res: Response) => {
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
    res.status(500).send({error: err})
  }
}

export const deleteUser = async (req: IRequest<TUser>, res: Response) => {
  try {
    const user = await User.findById(req.body._id)

    await User.findOneAndDelete({_id: user._id})
    res.status(200).json({success: true})
  } catch (err) {
    res.status(500).json({error: err})
  }
}
