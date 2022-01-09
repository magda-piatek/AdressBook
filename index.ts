import express, {Application} from 'express'
import passport from 'passport'
import session from 'express-session'

import connectDB from './config/db'
import user from './routes/user'
import auth from './routes/auth'
import contact from './routes/contact'

const {engine} = require('express-handlebars')

require('dotenv').config()

require('./utils/passport')

connectDB()

const app: Application = express()

const port = process.env.PORT

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

app.get('/', (req, res) => {
  res.render('login')
})

app.use(passport.initialize())
app.use(passport.session())

console.log(process.env.MONGO_DB_URL)

app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api/contact', contact)

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`)
  })
} catch (error: any) {
  console.error(`Error occured: ${error.message}`)
}
