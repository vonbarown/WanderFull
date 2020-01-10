const LocalStrategy = require('passport-local').Strategy;
const db = require('../../database/databasejs');
const bcrypt = require('bcrypt');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const data = await db.one(`
          SELECT id, username, password
          FROM users
          WHERE username=$1
        `, [username])

        console.log('Incoming U/P: ', username, password)
        console.log('Passport: ', data)

        try {
          bcrypt.compare(password, data.password, (err, isMatch) => {
            if (isMatch) {
              return done(null, {
                id: data.id,
                username: data.username
              })
            } else {
              return done(null, false, { message: 'Password does not match' })
            }
          })
        } catch (err2) {
          console.log(err2)
          return done(null, false)
        }
        
      } catch (err) {
        console.error('Error when selecting user on login', err)
        return done(null, false)
      }
    })
  )

  // Serialize user on successful login
  passport.serializeUser((user, done) => {
    console.log('Serializing User', user)
    done(null, user.id);
  });

  // Deserialize on logout
  passport.deserializeUser(async (id, done) => {
    console.log('Deserializing User', id)
    try {
      const data = await db.query(`
        SELECT id, username 
        FROM users WHERE id = $1
      `, [parseInt(id, 10)])

      console.log(data)

      done(null, false)
    } catch (err) {
      console.error('Error when selecting user on session deserialize', err)
      res.send('Invalid sign-in')
      done(null, false)
    }
  });
}
