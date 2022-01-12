import {model, models} from 'mongoose'

import {UserSchema} from '../schemas/user'
import {TUser} from '../types/user'

export default models.User || model<TUser>('User', UserSchema)
