import {contactData, loginCredentials} from '../../../constants/test-constants'
import {handleCreateContact, handleLogin} from '../../../utils/test-utils'

describe('POST /contact/create', () => {
  beforeEach(() => {
    jest.setTimeout(100000)
  })

  describe('when given first_name, last_name, phone_number, address are correct', () => {
    let createContactResponse, loginResponse
    beforeAll(async () => {
      loginResponse = await handleLogin(loginCredentials)
    })

    describe('user is authenticated', () => {
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

        test(`should error message be 'First name is a required'`, () => {
          expect(createContactResponse.body.error.first_name).toBe(
            'First name is a required'
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
})
