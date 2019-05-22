import { SQL } from '../constants';
import { Statement } from './statement';
const mysql = require('mysql');

export class Connection {

	public connection: any;

	constructor() {
		this.connection = mysql.createConnection({
			host: SQL.HOST,
			user: SQL.USER,
			password: SQL.PASSWORD,
			database: SQL.DATABASE,
		});
	}

	public close() {
		// this.connection
	}

	public async execute(fst: Statement) {
		try {
			let response: any;
			const sql = fst.prepare();
			const values = fst.toArray();
			console.log(values);
			const query = new Promise((resolve, reject) => {
				this.connection.query(sql, values, (err: any, res: any) => {
				  if (err) {
					return reject(err.message);
				  }
				  response = JSON.parse(JSON.stringify(res));
				  resolve();
				});
			});		
			await query;	
			return response;
		} finally {
			if (this.connection && this.connection.end) {this.connection.end(); }
		}	
	}
}
