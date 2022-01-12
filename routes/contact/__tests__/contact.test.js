import {
  handleCreateContact,
  handleLogin,
  contactData,
  loginCredentials,
} from '../../../utils/test-utils'

describe('POST /contact/create', () => {
  beforeEach(() => {
    jest.setTimeout(100000)
  })

  let createContactResponse, loginResponse

  describe('user is authenticated', () => {
    beforeAll(async () => {
      loginResponse = await handleLogin(loginCredentials)
    })

    describe('when given first_name, last_name, phone_number, address are correct', () => {
      beforeAll(async () => {
        createContactResponse = await handleCreateContact(
          contactData,
          loginResponse.body.result.token
        )
      })

      test('should respond with a 200 status code', () => {
        expect(createContactResponse.statusCode).toBe(200)
      })
    })
    describe('when given first_name is empty', () => {
      beforeAll(async () => {
        createContactResponse = await handleCreateContact(
          {
            ...contactData,
            first_name: '',
          },
          loginResponse.body.result.token
        )
      })

      test('should respond with a 400 status code', () => {
        expect(createContactResponse.statusCode).toBe(400)
      })

      test(`should respond with 'First name is required' error message`, () => {
        expect(createContactResponse.body.error.first_name).toBe(
          'First name is required'
        )
      })
    })

    describe('when given last_name is empty', () => {
      beforeAll(async () => {
        createContactResponse = await handleCreateContact(
          {
            ...contactData,
            last_name: '',
          },
          loginResponse.body.result.token
        )
      })

      test('should respond with a 400 status code', () => {
        expect(createContactResponse.statusCode).toBe(400)
      })

      test(`should respond with 'Last name is required' error message`, () => {
        expect(createContactResponse.body.error.last_name).toBe(
          'Last name is required'
        )
      })
    })

    describe('when given phone_number is empty', () => {
      beforeAll(async () => {
        createContactResponse = await handleCreateContact(
          {
            ...contactData,
            phone_number: '',
          },
          loginResponse.body.result.token
        )
      })

      test('should respond with a 400 status code', () => {
        expect(createContactResponse.statusCode).toBe(400)
      })

      test(`should respond with 'Phone number is required' error message`, () => {
        expect(createContactResponse.body.error.phone_number).toBe(
          'Phone number is required'
        )
      })
    })

    describe('when given address is empty', () => {
      beforeAll(async () => {
        createContactResponse = await handleCreateContact(
          {
            ...contactData,
            address: '',
          },
          loginResponse.body.result.token
        )
      })

      test('should respond with a 400 status code', () => {
        expect(createContactResponse.statusCode).toBe(400)
      })

      test(`should respond with 'Address is required' error message`, () => {
        expect(createContactResponse.body.error.address).toBe(
          'Address is required'
        )
      })
    })
  })

  describe('user is not authenticated', () => {
    beforeAll(async () => {
      createContactResponse = await handleCreateContact(contactData, '')
    })

    test('should respond with a 401 status code', () => {
      expect(createContactResponse.statusCode).toBe(401)
    })
  })
})
