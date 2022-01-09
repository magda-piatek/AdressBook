import {model, Schema, models} from 'mongoose'

import {TUser} from '../types/user'

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

export default models.User || model<TUser>('User', UserSchema)
