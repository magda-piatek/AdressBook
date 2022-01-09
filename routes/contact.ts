import express from 'express'
import passport from 'passport'

import contactSchema from '../validation/contact'
import validateObject from '../middleware/validation'

import * as contactController from '../controllers/contact-controller'

const router = express.Router()

router.post(
  '/create',
  passport.authenticate('jwt', {session: false}),
  validateObject(contactSchema),
  contactController.create
)

export default router
