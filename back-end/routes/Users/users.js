var express = require('express');
var router = express.Router();
const db = require('../../database/databasejs');
const hash = require('js-sha256').sha256;




/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('I am a user route')
});

router.get('/authenticate', async (req, res, next) => {
  console.log('Authentication route hit')
  console.log('Request body: ', {...req.body})
  const { username, password } = req.body
  const hashedPassword = hash(password)
  const query = `SELECT * FROM users WHERE username = $1 AND password = $2`
  const data = await db.any(query, [username, hashedPassword])
  console.log(data)

  res.json({
    status: 'success',
    message: 'User logged in',
    payload: data
  })

})

router.post('/register', async (req, res, next) => {
  console.log(req.body)

  const { username, password, firstname, lastname, email } = req.body
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


const getUser = async (req, res, next) => {

  try {
    let user = await db.any('SELECT * FROM users WHERE username = $1', req.body.username)

    res.json({
      status: 'success',
      message: 'retrieved user',
      payload: user
    })
  } catch (error) {
    console.log(error);
  }
}
//retrieving one users info
router.get('/username', getUser)


const updateUserInfo = async (req, res, next) => {
  // username, password, firstname, lastname, email, profile_pic


}

router.patch('/:username', updateUserInfo)


module.exports = router;
