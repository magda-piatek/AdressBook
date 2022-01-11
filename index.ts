import express, {Application} from 'express'
import passport from 'passport'
import session from 'express-session'

import connectDB from './config/db'
import user from './routes/user/user'
import auth from './routes/auth/auth'
import contact from './routes/contact/contact'

const {engine} = require('express-handlebars')

const port = process.env.PORT

require('dotenv').config()

require('./utils/passport')

connectDB()

const app: Application = express()

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

app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api/contact', contact)

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
      console.log(`Connected successfully on port ${port}`)
    })
  } catch (error: any) {
    console.error(`Error occured: ${error.message}`)
  }
}

export default app
