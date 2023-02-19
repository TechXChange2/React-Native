const db = require('../db');

module.exports = {

  createUser: (req, res) => {
    const data = req.body;

    console.log('create user body:', data);
    let qString = `INSERT INTO users (name, email, description, thumbnail_url, street, city, state, country) VALUES ("${data.name}", "${data.email}", "${data.description}", "${data.thumbnail_url}", "${data.street}", "${data.city}", "${data.state}", "${data.country}");`;

    db.query(qString, function(err, results) {
      if(err) {
        console.log('Error in Controllers: \n', err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }
      res.status(200).send(results);
    })

  },

  deleteUser: (req, res) => {
    const userEmail = req.query.email;

    let qString = `DELETE from users WHERE email='${userEmail}';`;

    db.query(qString, function(err, results) {
      if(err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      res.status(200).send(results);
    })

  },
  getUser: async (req, res) => {
    const entry = req.query.email ? req.query.email : req.query.userId
    var field = req.query.userId ? 'id' : 'email';
    // console.log('GETTING USER with email of', userEmail);

    const qString = `SELECT * FROM users WHERE ${field} = '${entry}';`;

    db.query(qString, function (err, results) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      // console.log('promise style results\n', results);
      res.status(200).send(results);
    });
  },

  getAllUsers: async (req, res) => {
    // console.log('GETTING All users');

    const qString = `SELECT * FROM users;`;

    db.query(qString, function (err, results) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      // console.log('promise style results\n', results);
      res.status(200).send(results);
    });
  },

  getUserByID: async (req, res) => {

    const userId = req.query.id;
    console.log(userId)
    const qString = `SELECT * FROM users WHERE id = '${userId}';`;

    db.query(qString, function (err, results) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      // console.log('promise style results\n', results);
      res.status(200).send(results);
    });
  },
};