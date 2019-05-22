
function createdb() {
    const mysql = require('mysql');
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
      });

    con.connect((err: any) => {
        if (err) { throw err; }
        console.log('Connected!');
        con.query('CREATE DATABASE PiazzaChiarino', (err: any, result: any) => {
          if (err) { throw err; }
          console.log('Database created');
        });
      });
}

module.exports = createdb;
