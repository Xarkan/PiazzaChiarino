
export class Condition {
	
	public variable: string;
	public value: any;
	public operator: string;
	
	constructor(variable: string, value: any, op = '=') {
		this.variable = variable;
		this.value = value;
		this.operator = op;
	}
}
