const connection = require('../../services/MySql');

class FollowerController {
  static follow(req, res) {
    connection.query(
      `INSERT INTO followers(vacation_id, user_id) VALUES(${req.body.vacation_id}, ${req.body.user_id})`,
      err => {
        if (err) throw err;
        res.sendStatus(200);
      }
    );
  }

  static unfollow(req, res) {
    const { vacation_id, user_id } = req.query;
    connection.query(
      `DELETE FROM followers WHERE vacation_id=${vacation_id} AND user_id=${user_id}`,
      err => {
        if (err) throw err;
        res.sendStatus(200);
      }
    );
  }
}

module.exports = FollowerController;
