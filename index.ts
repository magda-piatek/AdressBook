import express, {Express} from 'express'
import passport from 'passport'
import session from 'express-session'

import connectDB from './config/db-mongodb'
import swaggerDocs from './utils/swagger'
import routes from './routes/routes'

const {engine} = require('express-handlebars')

const port = process.env.PORT

require('dotenv').config()

require('./utils/passport')

connectDB()

const app: Express = express()

app.use(express.json())

app.use(
  session({
    secret: process.env.COOKIE_KEY as string,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: 4 * 60 * 60 * 1000},
  })
)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.set('views', './views')

app.use(passport.initialize())

routes(app)

app.get('/contacts', (req, res) => {
  res.render('contacts')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/', (req, res) => {
  res.render('login')
})

if (process.env.NODE_ENV !== 'test') {
  try {
    app.listen(port, (): void => {
      swaggerDocs(app, Number(port))

      console.log(`Connected successfully on port ${port}`)
    })
  } catch (error: any) {
    console.error(`Error occured: ${error.message}`)
  }
}

export default app
