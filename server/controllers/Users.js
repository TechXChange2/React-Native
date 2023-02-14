const db = require('../db');

module.exports = {
  authUser: async (req, res) => {
    const { body: data } = req;

    try {
      const query = `SELECT * FROM users WHERE email = "${data.email}";`;
      const conn = db.promise();
      const [[user]] = await conn.query(query);
      if (!user) {
        res.status(200).json(null);
        return;
      }

      const match = await bcrypt.compare(data.password, user.password);

      delete user.password;

      res.status(200).json(match ? user : null);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  createUser: async (req, res) => {
    const data = req.body;

    console.log('create user body:', data);
    let qString = `INSERT INTO users (name, email, description, thumbnail_url, street, city, state, country) VALUES ("${data.name}", "${data.email}", "${data.description}", "${data.thumbnail_url}", "${data.street}", "${data.city}", "${data.state}", "${data.country}");`;

    db.query(qString, function(err, results) {
      if(err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      res.status(200).send(results);
    })

    // try {


    //   const conn = db.promise();
    //   await conn.execute(query);

    //   query = `SELECT * FROM users WHERE email = "${data.email}"`;
    //   const [[user]] = await conn.query(query);

    //   res.status(201).json(user);
    // } catch (err) {
    //   res.status(500).send(err);
    // }
  },
  getUser: async (req, res) => {
    const userEmail = req.query.email;
    console.log('GETTING USER with email of', userEmail);

    const qString = `SELECT * FROM users WHERE email = '${userEmail}';`;

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
};
