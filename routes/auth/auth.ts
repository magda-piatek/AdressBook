import express from 'express'

import registerSchema from '../../validation/register'
import validateObject from '../../middleware/validation'
import * as authController from '../../controllers/auth-controller'

const router = express.Router()

router.post('/login', validateObject(registerSchema), authController.login)

export default router
