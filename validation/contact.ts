import * as yup from 'yup'

const contactSchema = yup.object().shape({
  first_name: yup.string().required('First name is a required'),
  last_name: yup.string().required('First name is a required'),
  phone_number: yup.string().required('Phone number is a required'),
  address: yup.string().required('Address is a required'),
})

export default contactSchema
