const express = require('express');
const router = express.Router();
const VacationController = require('./controllers/VacationController');
const UserController = require('./controllers/UserController');
const FollowerController = require('./controllers/FollowerController');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    const decoded = jwt.verify(token, 'secret1234');
    if (decoded.hasOwnProperty('user_id')) {
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
};

const verifyAdminToken = (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    const decoded = jwt.verify(token, 'secret1234');
    if (decoded.user_id === 1) {
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
};
/* Vacations */
router.get('/vacations', verifyToken, VacationController.getAllVacations);

router.get(
  '/vacations/:id',
  verifyAdminToken,
  VacationController.getSingleVacation
);

router.post('/vacations', VacationController.AddVacation);

router.delete(
  '/vacations/:id',
  verifyAdminToken,
  VacationController.deleteVacation
);

router.put('/vacations/:id', verifyAdminToken, VacationController.editVacation);

/* Followers */
router.post('/followers', verifyToken, FollowerController.follow);

router.delete('/followers', verifyToken, FollowerController.unfollow);

/*Users */

router.post('/signin', UserController.signIn);

router.post('/signup', UserController.signUp);

router.post('/auth', UserController.authenticate);

module.exports = router;
