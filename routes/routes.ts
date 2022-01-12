import {Express} from 'express'
import authRoutes from './auth/auth'
import contactRoutes from './contact/contact'
import userRoutes from './user/user'

function routes(app: Express) {
  contactRoutes(app)
  userRoutes(app)
  authRoutes(app)
}

export default routes
