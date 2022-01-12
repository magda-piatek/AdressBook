import * as yup from 'yup'

const contactSchema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  phone_number: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
})

export default contactSchema
