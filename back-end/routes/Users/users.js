var express = require('express');
var router = express.Router();
const db  = require('../../database/databasejs');
const hash = require('js-sha256').sha256;

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('I am a user route')
});

router.get('/authenticate', async (req, res, next) => {
  console.log('Authentication')
  console.log(req.body)
  const { username, password } = req.body
  const hashedPassword = hash(password)
  console.log(hashedPassword)
  const query = `SELECT * FROM users WHERE username = $1 AND password = $2`
  const data = await db.any(query, [username, hashedPassword])
  console.log(data)
  res.json(data)
})

router.post('/register', async (req, res, next) => {
  console.log(req.body)

  const {username, password, firstname, lastname, email} = req.body
  const hashedPassword = hash(password)

  const query = `
    INSERT INTO users (username, password, firstname, lastname, email) 
    values (
      $1, $2, $3, $4, $5
    ) 
  `
  try {
    const data = await db.any(query, [username, hashedPassword, firstname, lastname, email])
    console.log(data)
    console.log('User Created')
    res.send('User created')
  } catch (err) {
    console.error(err)
    console.log('User not created')
    res.send('User not created')
  }
})

module.exports = router;
