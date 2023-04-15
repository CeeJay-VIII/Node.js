/**
 * Required dependancies [npn install -]
 ********************************************************/
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const ejs = require('ejs');

/**
 * Set up your Express app ejs view-engine
 ***************************************************************************/
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve all your resources to be refferenced in views
app.use(express.static('public'));

  

/**
 * Define your MySQL database
 ********************************************************/
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
});


/**
 * Connect to the database
 *********************************************************/
db.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ', err);
    } else {
      console.log('Connected to database');
    }
  });



/**
 * GET method (Default view)-----------------------------READ-----------------------
 ***********************************************************************************/
app.get('/', (req, res) => {
  const query = 'SELECT * FROM nodejs_table';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error querying database: ', err);
      res.status(500).send('Error querying database');
    } else {
      const users = result;
      res.render('index', { users });
    }
  });
});

/**
 * GET & POST method-------------------------CREATE-----------------
 *******************************************************************/
app.get('/create', (req, res) => {
    res.render('create');
  });
  
app.post('/create', (req, res) => {
    const { name, email, password } = req.body;
    const query = `INSERT INTO nodejs_table (name, email, password) VALUES ('${name}', '${email}', '${password}')`;
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error creating item: ', err);
        res.status(500).send('Error creating item');
      } else {
        res.redirect('/?param=New user created successfully.');
      }
    });
  });



/**
 * GET & POST methods--------------------------UPDATE------------------------
 ****************************************************************************/
app.get('/update/:id', (req, res) => {
    const userId = req.params.id;
    const query = `SELECT * FROM nodejs_table WHERE id = ${userId}`;
    db.query(query, (err, result) => {
      if (err) {
        throw err;
      }
      const user = result[0];
      res.render('update', { user });
    });
  });
  
  app.post('/update/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    const query = `UPDATE nodejs_table SET name = '${name}', email = '${email}', password = '${password}' WHERE id = ${userId}`;
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error updating item: ', err);
        res.status(500).send('Error updating item');
      } else {
        res.redirect('/?param='+name+' updated successfully');
      }
    });
  });



/**
 * GET & POST methods--------------------------DELETE------------------------
 ****************************************************************************/
app.get('/delete/:id', (req, res) => {
    const userId = req.params.id;
    const query = `SELECT * FROM nodejs_table WHERE id = ${userId}`;
    db.query(query, (err, result) => {
      if (err) {
        throw err;
      }
      const user = result[0];
      res.render('delete', { user });
    });
  });

  app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM nodejs_table WHERE id = ${id}`;
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error deleting item: ', err);
        res.status(500).send('Error deleting item');
      } else {
        res.redirect('/?param=User deleted successfully');
      }
    });
  });

/**
 * Start your server by listening on a specific port
 **************************************************************************/
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
