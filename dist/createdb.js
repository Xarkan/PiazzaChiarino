function createdb() {
    const mysql = require('mysql');
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
    });
    con.connect((err) => {
        if (err) {
            throw err;
        }
        console.log('Connected!');
        con.query('CREATE DATABASE PiazzaChiarino', (err, result) => {
            if (err) {
                throw err;
            }
            console.log('Database created');
        });
    });
}
module.exports = createdb;
//# sourceMappingURL=createdb.js.map