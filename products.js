








const express = require('express');
const mysql = require("mysql")

 






app.get('/',(req,res)=>{
    res.send('Hey');
});

app.listen(PORT,()=>console.loge(`The server in runing on port ${PORT}`));






//const psql = require('pg')
//require('dotnev').config();
//const fs = require('fs');
//const csv = require('fast-csv');
const app = express();

const port = 9000; // Changed port to avoid conflict

// Middleware for parsing JSON and URL-encoded data// bodyParser
//app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: true }));





// MySQL database connection settings
const industrial = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '0915539084', // Replace with your MySQL password
  database: 'industrial', // Replace with your database name
  port: '9000' // Port is typically 3306 for MySQL
});

// Connect to the database
//industrial.connect((err) => {
  //if (err) throw err;
  //console.log('Connected to MySQL');
//});
//
// GET route to fetch users (example)
//app.get('/api/users', (req, res) => {
 // const sql = 'SELECT * FROM users';
  //industrial.query(sql, (err, results) => {
    //if (err) throw err;
    //res.json(results);
  //});
//});

// POST route to upload data from a CSV file

app.post('/api/upload-csv', (req, res) => {
  const filePath = 'data.csv'; // Replace with actual path
  const stream = fs.createReadStream(filePath);
  const csvStream = csv.parse({ headers: true })
    .on('data', (row) => {
      const sql = 'INSERT INTO users SET ?';
      industrial.query(sql, row, (err, results) => {
        if (err) throw err;
      });
    })
       
    .on('end', () => {
      res.send('CSV file successfully processed');
    });
    
  //stream.pipe(csvStream);
});

// POST route to upload data from a JSON file
app.post('/api/upload-json', (req, res) => {
  const filePath = 'package-lock.json'; // Replace with actual path
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  jsonData.forEach((row) => {
    const sql = 'INSERT INTO users SET ?';
    industrial.query(sql, row, (err, results) => {
      if (err) throw err;
    });
  });
  res.send('JSON file successfully processed');
});

// Start the server
app.listen(port,() => {
  console.log('Server is running on https://localhost:'+port);
});




/*


//==================
const express = require('express');
const app = express();
const psql = require('pg')
require('dotnev').config();
const PORT = process || 3000;

const pool= require('pg').pool;
const pool = new pool({

  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '0915539084', // Replace with your MySQL password
  database: 'industrial', // Replace with your database name
  port: '5432' // Port is typically 3306 for MySQL
});

// Start the server
app.listen(port,() =>{
  console.log(`Server is  running on https://localhost:'${port}`);
  app.get('api/user',(req,res) =>{
    pool.query('SELECT * FROM user',(err,results)=>{
      if(err) throw err;
      res.json(results);
    });
  });

});
// how  to create new usres
app.post('/api/user',(req,res)=>{
  const {name, email,} = req.body;
});




const express = require('express');
const app = express();
const mysql = require('mysql2');

// Ersätt med dina faktiska MySQL-uppgifter
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0915539084',
  database: 'products',
  PORT: '9000'
});
 industrial.connect((err) => {
  if (err) {
    console.error('Fel vid anslutning till databasen:', err);
  } else {
    console.log('Ansluten till databasen!');
  }
});
app.use(express.json()); // För att kunna läsa JSON-data från webbsidan
app.post('/orders', (req, res) => {
  const { productId, orderNumber } = req.body;
  // Generera ett unikt radnummer
  const uniqueId = Math.floor(Math.random() * 1000);
  // Skapa SQL-frågan
  const sql = 'INSERT INTO orders (product_id, order_number, unique_id) VALUES (?, ?, ?)';
  const values = [productId, orderNumber, uniqueId];
  industrial .query(sql, values, (err, result) => {
    if (err) {
      console.error('Fel vid spara beställning:', err);
      res.status(500).send('Fel vid skicka beställning. Försök igen.');
    } else {
      console.log('Beställning sparad:', result);
      res.status(200).send('Beställning skickades!');   // Skicka ett bekräftelsemeddelande till webbsidan
    }
  });
});

// Starta servern och lyssna på port 
app.listen(PORT, () => {
  console.log('Server lyssnar på http://localhost:3306'+PORT);
});

*/