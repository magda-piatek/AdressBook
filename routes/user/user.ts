import express from 'express'

import registerSchema from '../../validation/register'
import validateObject from '../../middleware/validation'

import * as userController from '../../controllers/user-controller'

const router = express.Router()

router.post(
  '/register',
  validateObject(registerSchema),
  userController.postUser
)

router.delete('/delete', userController.deleteUser)

export default router
