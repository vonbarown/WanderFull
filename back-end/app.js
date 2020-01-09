const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const db = require('./database/databasejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const hash = require('js-sha256').sha256



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images')
  },
  filename: (req, file, cb) => {
    let name = Date.now() + '-' + file.originalname
    cb(null, name)
  }
})

const upload = multer({
  storage: storage
})


const indexRouter = require('./routes/index')
const usersRouter = require('./routes/Users/users')
const photosRouter = require('./routes/Posts/posts')
const likesRouter = require('./routes/Likes/likes')
const registerRouter = require('./routes/Users/register')

const app = express();

// Passport setup
app.use(session({ secret: 'meow', resave: false, saveUninitialized: false })); // Import secret from .env
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// PASSPORT
passport.use(new LocalStrategy(async (username, password, cb) => {
  try {
    const data = await db.one('SELECT id, username, password FROM users WHERE username=$1', [username])
    console.log('Incoming U/P: ', username, password)
    console.log('Passport: ', data)
    if (hash(password) === data.password) {
      cb(null, { id: data.id, username: data.username })
    } else {
      cb(null, false)
    }
  } catch (err) {
    console.error('Error when selecting user on login', err)
    cb(null, false)
  }
}))

passport.serializeUser((user, done) => {
  console.log('Serialize Hit', user)
  done(null, user.id);
});

// DESERIALIZE NOT COMPLETE YET
passport.deserializeUser( async (id, done) => {
  console.log('De-Serialize Hit')
  try {
    const data = await db.query('SELECT id, username FROM users WHERE id = $1', [parseInt(id, 10)])
    console.log(data)
    done(null, false)
  } catch (err) {
    console.error('Error when selecting user on session deserialize', err)
    res.send('Invalid sign-in')
    done(null, false)
  }
});

const loggedIn = (req, res, next) => req.user ? next() : res.redirect('/')

// Routes
app.use('/', indexRouter)
app.use('/register', registerRouter)
// app.use('/users', passport.authenticate('local'), usersRouter)
app.use('/users', usersRouter)
app.use('/posts', upload.single('imageUrl'), photosRouter)
app.use('/likes', likesRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
