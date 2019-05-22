import { Condition } from "./condition";
import { Connection } from "./connection";
import { Statement } from "./statement";

exports.run = async (table: string, type: string, cond: Array<Condition>) => {
	const con = new Connection();
	const st = new Statement(table, type, cond);
	const result = await con.execute(st);
	return result;
}