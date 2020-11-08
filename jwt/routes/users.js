var express = require('express');
var router = express.Router();
var [getUsers, insertUser] = require('../controllers/user');

/* GET user listing. */
router.get('/', async function (req, res, next) {
  const users = await getUsers();
  res.send(users);
});
/**
 * POST user
 */
router.post('/', async function (req, res, next) {
  const newUser = await insertUser(req.body);
  res.send(newUser);
});

module.exports = router;