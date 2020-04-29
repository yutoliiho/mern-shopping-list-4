const express = require('express');
const router = express.Router();

const Users = require('../../models/Users');

router.get('/', (req, res) => {
  Users.find()
    .sort({
      date: -1,
    })
    .then((users) => res.json(users));
});

router.post('/', (req, res) => {
  // post a new item to the DB
  const newUsers = new Users({
    name: req.body.name,
    age: req.body.age,
    // date is automatically using defualt.
  });
  newUsers.save().then((user) => res.json(user));
});

router.delete('/:id', (req, res) => {
  Users.findById(req.params.id)
    .then((user) => user.remove().then(() => res.json({ success: true })))
    .catch((e) => {
      res.status(404).json({ success: false });
    });
});

module.exports = router;
