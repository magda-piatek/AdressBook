import checkValidPassword from '../../../utils/check-valid-password'
import {registerCredentials} from '../../../constants/test-constants'
import {handleDeleteUser, handlePostUser} from '../../../utils/test-utils'

describe('POST /user/register', () => {
  beforeEach(() => {
    jest.setTimeout(10000)
  })

  describe('when given an email and password is correct', () => {
    let registerResponse

    const {email, password} = registerCredentials

    beforeAll(async () => {
      registerResponse = await handlePostUser(registerCredentials)
    })
    afterAll(() => {
      handleDeleteUser({_id: registerResponse.body.result.user._id})
    })

    test('should respond with a 200 status code', () => {
      expect(registerResponse.statusCode).toBe(200)
    })

    test('should an email in registerResponse and given email be equal', () => {
      expect(registerResponse.body.result.user.email).toBe(email)
    })

    test('should password in registerResponse and given passport be equal', async () => {
      const isValidPassport = await checkValidPassword(
        password,
        registerResponse.body.result.user
      )
      expect(isValidPassport).toBe(true)
    })
  })

  describe('when a given email is not in a correct format', () => {
    let registerResponse,
      email = 'email'

    beforeAll(async () => {
      registerResponse = await handlePostUser({
        ...registerCredentials,
        email,
      })
    })

    test('should respond with a 400 status code', () => {
      expect(registerResponse.statusCode).toBe(400)
    })

    test(`should error message be 'Invalid email format'`, () => {
      expect(registerResponse.body.error.email).toBe('Invalid email format')
    })
  })

  describe('when the email is missing', () => {
    let registerResponse

    beforeAll(async () => {
      registerResponse = await handlePostUser({
        ...registerCredentials,
        email: '',
      })
    })

    test('should respond with a 400 status code', () => {
      expect(registerResponse.statusCode).toBe(400)
    })

    test(`should error message be 'Email is a required'`, () => {
      expect(registerResponse.body.error.email).toBe('Email is a required')
    })
  })

  describe('when the password is missing', () => {
    let registerResponse
    beforeAll(async () => {
      registerResponse = await handlePostUser({
        ...registerCredentials,
        password: '',
      })
    })

    test('should respond with a 400 status code', () => {
      expect(registerResponse.statusCode).toBe(400)
    })

    test(`should error message be 'Password is a required'`, () => {
      expect(registerResponse.body.error.password).toBe(
        'Password is a required'
      )
    })
  })

  describe('when the password and email are missing', () => {
    let registerResponse
    beforeAll(async () => {
      registerResponse = await handlePostUser({
        email: '',
        password: '',
      })
    })

    test('should respond with a 400 status code', () => {
      expect(registerResponse.statusCode).toBe(400)
    })

    test(`should error message be 'Password is a required' and 'Email is a required'`, () => {
      const {password, email} = registerResponse.body.error

      expect(Object.keys(registerResponse.body.error).length).toBe(2)
      expect(password).toBe('Password is a required')
      expect(email).toBe('Email is a required')
    })
  })
})
