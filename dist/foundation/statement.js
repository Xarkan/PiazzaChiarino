"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Statement {
    constructor(tab, type, c = []) {
        this.table = tab;
        this.type = type;
        this.conditions = c;
    }
    setTable(t) {
        this.table = t;
    }
    setConditions(conditions) {
        this.conditions = conditions;
    }
    toArray() {
        const array = [];
        for (const c of this.conditions) {
            array.push(c.value);
        }
        return array;
    }
    prepare() {
        let firstElem = true;
        let condStatement;
        let sql;
        for (const c of this.conditions) {
            if (firstElem) {
                condStatement = c.variable + " " + c.operator + " ?";
                firstElem = false;
            }
            else {
                condStatement = condStatement + " AND " + c.variable + " " + c.operator + " ?";
            }
        }
        switch (this.type) {
            case 'delete':
                sql = "DELETE FROM " + this.table + " WHERE " + condStatement;
                break;
            case 'save':
                let insert = '';
                let values = '';
                for (const c of this.conditions) {
                    values = values + '?,';
                    insert = insert + c.variable + ",";
                }
                const fields = insert.slice(0, -1);
                const qmarks = values.slice(0, -1);
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
exports.Statement = Statement;
//------------
//# sourceMappingURL=statement.js.map