import {loginCredentials} from '../../../constants/test-constants'
import {handleLogin} from '../../../utils/test-utils'

describe('POST /auth/login', () => {
  beforeEach(() => {
    jest.setTimeout(10000)
  })

  describe('given a correct email and password', () => {
    let loginReponse

    beforeAll(async () => {
      loginReponse = await handleLogin(loginCredentials)
    })

    test('should respond with a 200 status code', () => {
      expect(loginReponse.statusCode).toBe(200)
    })
  })

  describe('given an incorrect password', () => {
    let loginReponse,
      password = 'test1234'

    beforeAll(async () => {
      loginReponse = await handleLogin({
        ...loginCredentials,
        password,
      })
    })

    test('should respond with a 401 status code', () => {
      expect(loginReponse.statusCode).toBe(401)
    })

    test(`should error message be 'Password is incorrect'`, () => {
      expect(loginReponse.body.error).toBe('Password is incorrect')
    })
  })

  describe('given an incorrect email', () => {
    let loginReponse,
      email = 'testuser32@gmail.com'

    beforeAll(async () => {
      loginReponse = await handleLogin({
        ...loginCredentials,
        email,
      })
    })

    test('should respond with a 401 status code', () => {
      expect(loginReponse.statusCode).toBe(401)
    })

    test(`should error message be 'User doesn't exist'`, () => {
      expect(loginReponse.body.error).toBe(`User doesn't exist`)
    })
  })
})
