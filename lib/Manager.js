const Employee = require("./Employee");

class Manager extends Employee {

    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getOffice() {
        return this.officeNumber;
    };

    getRole() {
        return "Manager";
    }

}

// EXPORT DATA
module.exports = Manager;