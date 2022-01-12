import {Express} from 'express'

import authSchema from '../../validation/auth'
import validateObject from '../../middleware/validation'

import * as userController from '../../controllers/user-controller'

function routes(app: Express) {
  /**
   * @openapi
   * '/api/user/register':
   *  post:
   *     tags:
   *     - User
   *     summary: Create a user
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
  app.post(
    '/api/user/register',
    validateObject(authSchema),
    userController.postUser
  )

  app.delete('/api/user/delete', userController.deleteUser)
}

export default routes
