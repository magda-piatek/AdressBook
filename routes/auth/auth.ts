import {Express} from 'express'

import authSchema from '../../validation/auth'
import validateObject from '../../middleware/validation'
import * as authController from '../../controllers/auth-controller'

function routes(app: Express) {
  /**
   * @openapi
   * '/api/auth/login':
   *  post:
   *     tags:
   *     - Auth
   *     summary: Login
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/User'
   *     responses:
   *      200:
   *        description: Success
   *      500:
   *        description: Internal Server Error
   *      400:
   *        description: Bad request
   *
   */

  app.post('/api/auth/login', validateObject(authSchema), authController.login)
}
export default routes
