import { ID } from "./Id";

export class Salesmans {
    list: Salesman[];
    constructor(list: Salesman[]) {
        this.list = list;
    }
}

export class Salesman {
    id: ID;
    firstName: FirstName;
    lastName: LastName;
    department: Department;
    outcome: Outcome;

    constructor(id: ID, firstName: FirstName, lastName: LastName,
        department: Department, outcome: Outcome) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.department = department;
        this.outcome = outcome;
    }
}

export class FirstName {
    value: string;
    constructor(value: string) {
        this.value = value;
    }
}
export class LastName {
    value: string;
    constructor(value: string) {
        this.value = value;
    }
}

export class Department {
    value: string;
    constructor(value: string) {
        this.value = value;
    }
}

export class Outcome {
    value: string;
    constructor(value: string) {
        this.value = value;
    }
}