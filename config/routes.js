require('dotenv').config();

const axios = require('axios');
const bcrypt = require('bcrypt');
const knex = require('knex');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
const jwt = require('jsonwebtoken');

const { authenticate } = require('../auth/authenticate');

const sessionConfig = {
  name: 'monkey', // default is sid
  secret: 'joqiej;lksdjfoifoierqeoiausa9879*a96876relhjlkn&&T*&^%*yogfhldkj',
  cookie: {
    maxAge: 1000 * 60 * 5, // in miliseconds
    secure: false // only send the cookie over https, should be true in production
  },
  httpOnly: true, // js can't touch this,
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    tablename: 'sessions',
    sidfieldname: 'sid',
    knex: db,
    createtable: true,
    clearInterval: 1000 * 60 * 10
  })
};

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function generateToken(user) {
  const payload = {
    username: user.username,
    department: ['admin', 'NYC']
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '45m'
  };
  return jwt.sign(payload, secret, options);
}

function register(req, res) {
  const userInfo = req.body;
  const hash = bcrypt.hashSync(userInfo.password, 12);
  userInfo.password = hash;
  db('users')
    .insert(userInfo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
}

// server.post('/api/login', async (req, res) => {
//   try {
//     const creds = req.body;
//     const user = await db('users')
//       .where({ username: creds.username })
//       .first(); // this would show two instances of the user without first. Not sure why atm
//     if (user && bcrypt.compareSync(creds.password, user.password)) {
//       // login is successful
//       // create the token
//       const token = generateToken(user);
//       res
//         .status(responseStatus.success)
//         .json({ message: `Welcome ${user.username}`, token });
//     } else {
//       res
//         .status(responseStatus.unauthorised)
//         .json({ message: 'You shall not pass!' });
//     }
//   } catch (error) {
//     res.status(responseStatus.serverError).json(error);
//   }
// });

function login(req, res) {
  const creds = req.body;
  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.username}`, token });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(err => console.log('Err =', err));
  // res.status(500).json(err));
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' }
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
