const connection = require('../../services/MySql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  static signIn(req, res) {
    const { username, password } = req.body;
    connection.query(
      `SELECT * FROM users WHERE username="${username}"`,
      function(err, result) {
        if (err) throw err;
        if (result.length === 0) {
          res.send({ logtype: 'error' });
        } else {
          bcrypt.compare(password, result[0].password, function(
            err,
            matchresult
          ) {
            if (err) throw err;
            if (matchresult) {
              const accessToken = jwt.sign(
                { user_id: result[0].user_id },
                'secret1234'
              );
              result[0].role === 1
                ? res.send({
                    logtype: 'admin',
                    username: result[0].username,
                    user_id: result[0].user_id,
                    accessToken
                  })
                : res.send({
                    logtype: 'user',
                    username: result[0].username,
                    user_id: result[0].user_id,
                    accessToken
                  });
            } else {
              res.send({ logtype: 'error' });
            }
          });
        }
      }
    );
  }

  static signUp(req, res) {
    const saltRounds = 10;
    let password = req.body.password;
    const { fname, lname, username } = req.body;
    if (
      password.length >= 4 &&
      username.length >= 4 &&
      fname.length > 0 &&
      lname.length > 0
    ) {
      bcrypt.hash(password, saltRounds, function(err, hashedPassword) {
        if (err) throw err;
        password = hashedPassword;
        connection.query(
          `SELECT * FROM users WHERE username="${username}"`,
          function(err, result) {
            if (err) throw err;
            if (result.length === 0) {
              connection.query(
                `INSERT INTO users(first_name, last_name, username, password, role) VALUES("${fname}", "${lname}", "${username}", "${password}", 2)`,
                (err, result) => {
                  if (err) throw err;
                  const accessToken = jwt.sign(
                    { user_id: result.insertId },
                    'secret1234',
                    {
                      expiresIn: 60 * 60 * 3
                    }
                  );
                  res.send({
                    logtype: 'user',
                    username,
                    user_id: result.insertId,
                    accessToken
                  });
                }
              );
            } else {
              res.send('error');
            }
          }
        );
      });
    } else {
      res.sendStatus(400);
    }
  }

  static authenticate(req, res) {
    const token = req.headers.token;
    jwt.verify(token, 'secret1234', (err, decoded) => {
      if (err) {
        console.log('error');
        res.send({ logtype: 'unauthorized' });
      } else if (decoded.hasOwnProperty('user_id')) {
        connection.query(
          `SELECT * FROM USERS WHERE user_id=${decoded.user_id}`,
          (err, result) => {
            if (err) throw err;
            result[0].role === 1
              ? res.send({
                  logtype: 'admin',
                  username: result[0].username,
                  user_id: result[0].user_id,
                  accessToken: token
                })
              : res.send({
                  logtype: 'user',
                  username: result[0].username,
                  user_id: result[0].user_id,
                  accessToken: token
                });
          }
        );
      } else {
        res.send({ logtype: 'unauthorized' });
      }
    });
  }
}

module.exports = UserController;
