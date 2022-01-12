import {model, models} from 'mongoose'

import {ContactSchema} from '../schemas/contact'
import {TContact} from '../types/contact'

export default models.Contact || model<TContact>('Contact', ContactSchema)
