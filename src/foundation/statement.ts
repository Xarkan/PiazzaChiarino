import { Condition } from "./condition";

export class Statement
{
	 public table: string;
	 public type: string; // exist, store ecc
	 public conditions: Condition[]; 

	constructor(tab: string, type: string, c: Condition[] = [])
	{
		this.table = tab;
		this.type = type;
		this.conditions = c;
	}

	public setTable(t: string) {
		this.table = t;
	}

	public setConditions(conditions: Condition[]) {
		this.conditions = conditions;
	}

	public toArray() {
		const array: any[] = []; 
		for (const c of this.conditions) { 
			array.push(c.value);
		}
		return array;
	}

	public prepare() {
		let firstElem = true;
		let condStatement: string;
		let sql: string;
		for (const c of this.conditions) { 
			if (firstElem) {
				condStatement = c.variable + " " + c.operator + " ?";					
				firstElem = false;
			} else {
				condStatement = condStatement + " AND " + c.variable + " " + c.operator + " ?";
			}
		}
		switch (this.type) {
			case 'delete':
				sql = "DELETE FROM " + this.table + " WHERE " + condStatement;
				break;

			case 'save':
				let insert: string = '';
				let values: string = '';
				for (const c of this.conditions) { 
					values = values + '?,';
					insert = insert + c.variable + ",";	
				}
				const fields = insert.slice(0, - 1);
				const qmarks = values.slice(0, - 1);

		        sql = "INSERT INTO " + this.table + "(" + fields + ") VALUES (" + qmarks + ")";
				break;
			
			case 'count':
				sql = "SELECT COUNT(*) AS total FROM " + this.table + " WHERE " + condStatement;
				break;

			default:
				sql = "SELECT * FROM " + this.table + " WHERE " + condStatement;
				break;
		}
		console.log(sql);
		return sql;
	}
}
//------------