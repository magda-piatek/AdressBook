import {Express} from 'express'
import passport from 'passport'

import contactSchema from '../../validation/contact'
import validateObject from '../../middleware/validation'

import * as contactController from '../../controllers/contact-controller'

function routes(app: Express) {
  /**
   *  @swagger
   *   components:
   *     securitySchemes:
   *        BearerAuth:
   *          type: http
   *          scheme: bearer
   */

  /**
   * @openapi
   * '/api/contact/create':
   *  post:
   *     security:
   *     - BearerAuth: []
   *     tags:
   *     - Contact
   *     summary: Create a contact
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/Contact'
   *     responses:
   *      200:
   *        description: Success
   *      500:
   *        description: Internal Server Error
   *      401:
   *        description: Unauthorized
   *      400:
   *        description: Bad request
   *
   */
  app.post(
    '/api/contact/create',
    passport.authenticate('jwt', {session: false}),
    validateObject(contactSchema),
    contactController.createContact
  )

  /**
   * @openapi
   * '/api/contact/get':
   *  get:
   *     security:
   *     - BearerAuth: []
   *     tags:
   *     - Contact
   *     summary: Get contacts
   *     responses:
   *      200:
   *        description: Success
   *      500:
   *        description: Internal Server Error
   *      401:
   *        description: Unauthorized
   *      400:
   *        description: Bad request
   *
   */
  app.get(
    '/api/contact/get',
    passport.authenticate('jwt', {session: false}),
    contactController.getContacts
  )
}

export default routes
