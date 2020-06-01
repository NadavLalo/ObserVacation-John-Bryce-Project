const connection = require('../../services/MySql');
const path = require('path');
const fs = require('fs');

class VacationController {
  static getAllVacations(req, res) {
    let vacations, vacationsUserFollows;
    const user_id = req.query.user_id;

    //Get all vacations join table with number of followers
    connection.query(
      `SELECT vacations.*,COUNT(followers.vacation_id) as followers
        FROM vacations LEFT JOIN followers ON vacations.vacation_id=followers.vacation_id GROUP BY vacations.vacation_id, followers.vacation_id`,
      (err, result) => {
        if (err) throw err;
        vacations = result;
        connection.query(
          `SELECT vacation_id FROM followers WHERE user_id=${user_id}`,
          (err, result2) => {
            if (err) throw err;
            vacationsUserFollows = result2;
            res.send({ vacations, vacationsUserFollows });
          }
        );
      }
    );
  }

  static getSingleVacation(req, res) {
    const id = req.params.id;
    connection.query(
      `SELECT * FROM vacations WHERE vacation_id=${id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result[0]);
      }
    );
  }

  static AddVacation(req, res) {
    const { destination, description, price, start_date, end_date } = req.body;
    if (
      destination.length > 0 &&
      description.length > 0 &&
      price.length > 0 &&
      start_date.length > 0 &&
      end_date.length > 0
    ) {
      const file = req.files.image;
      connection.query(
        `INSERT INTO vacations(destination, description, start_date, end_date, price) VALUES("${destination}", "${description}","${start_date}", "${end_date}", "${price}")`,
        (err, result) => {
          if (err) throw err;
          connection.query(
            `UPDATE vacations SET img ="/uploads/${result.insertId}.jpg" WHERE vacation_id=${result.insertId}`
          );
          file.mv(`${__dirname}\\../../uploads/${result.insertId}.jpg`);
          connection.query(
            `SELECT vacations.*,COUNT(followers.vacation_id) as followers
            FROM vacations LEFT JOIN followers ON vacations.vacation_id=followers.vacation_id WHERE vacations.vacation_id=${result.insertId} GROUP BY vacations.vacation_id, followers.vacation_id`,
            (err, result2) => {
              res.send(result2[0]);
              if (err) throw err;
            }
          );
        }
      );
    } else {
      res.sendStatus(400);
    }
  }

  static deleteVacation(req, res) {
    const id = req.params.id;
    connection.query(`SELECT * FROM vacations WHERE vacation_id=${id}`, err => {
      if (err) throw err;
      fs.unlink(`${__dirname}\\../../uploads/${id}.jpg`, err => {
        if (err) throw err;
        connection.query(`DELETE FROM vacations WHERE vacation_id=${id}`);
      });
      connection.query(`DELETE FROM followers WHERE vacation_id=${id}`);
    });
    res.send('success');
  }

  static editVacation(req, res) {
    const id = req.params.id;
    if (req.files) {
      const file = req.files.image;
      fs.unlink(`${__dirname}\\../../uploads/${id}.jpg`, err => {
        if (err) throw err;
      });
      file.mv(`${__dirname}\\../../uploads/${id}.jpg`);

      //Add random parameter for image rerender
      connection.query(
        `UPDATE vacations SET img="/uploads/${id}.jpg?${new Date().getTime()}" WHERE vacation_id=${id}`
      );
    }

    if (Object.getOwnPropertyNames(req.body).length !== 0) {
      connection.query(
        `UPDATE vacations SET ? WHERE vacation_id=${id}`,
        req.body,
        err => {
          if (err) throw err;
        }
      );
    }
    connection.query(
      `SELECT vacations.*,COUNT(followers.vacation_id) as followers
      FROM vacations LEFT JOIN followers ON vacations.vacation_id=followers.vacation_id WHERE vacations.vacation_id=${id} GROUP BY vacations.vacation_id, followers.vacation_id`,
      (err, result) => {
        if (err) throw err;
        res.send(result[0]);
      }
    );
  }
}

module.exports = VacationController;
