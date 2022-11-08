const customerTable = require("../Models/customerModel/registerModule");
const customerAddTable = require("../Models/customerModel/addressModel");
const { Sequelize, Op } = require('sequelize');

let Queries = {}


Queries.findPhNO = (req) => {
    return customerTable.findAll({ where: { phone: req.body.phone } });
};

Queries.checkDetails = (req) => {
    return customerTable.findAll({ where: { email: req.body.email } });
};

Queries.createCustomer = (req, hashPass) => {
    return customerTable.create({ name: req.body.name, email: req.body.email, phone: req.body.phone, password: hashPass, step: 1, Status: "Verified" });
};

Queries.createAddress = (req, CustomerID) => {
    return customerAddTable.findOrCreate({ where: { address: req.body.address, Cus_ID: CustomerID } });
};

Queries.updateStepValue = (req, CustomerID) => {
    return customerTable.update({ step: '0' }, { where: { id: CustomerID } });
};

Queries.findDetails = (CustomerID) => {
    return customerTable.findOne({
        attributes: {
            exclude: ['password']
        },
        include: [{
            model: customerAddTable,
            attributes: ["address"]
        }],
        where: {
            id: CustomerID
        }
    });
};





module.exports = Queries;
