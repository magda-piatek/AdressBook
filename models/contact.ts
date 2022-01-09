import {model, Schema, models} from 'mongoose'

import {TContact} from '../types/contact'

const ContactSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
})

export default models.Contact || model<TContact>('Contact', ContactSchema)
