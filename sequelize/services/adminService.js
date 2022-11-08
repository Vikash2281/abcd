const adminTable = require("../Models/adminModel/adminModel");
const customerTable = require("../Models/customerModel/registerModule");
const productTable = require("../Models/productModel/productModel");
const merchantTable = require("../Models/MerchantModel/merchantmodels/merRegModel");
const paginition = require("../Controller/helperCTRL/pagination");


Quries = {};

Quries.checkDetails = (req) => {
    return adminTable.findAll({ where: { email: req.body.email } });
};

Quries.blockCustomer = (req, status) => {
    console.log("dc");
    return customerTable.update({ Status: status }, { where: { id: req.query.CustomerID } });
};
Quries.merchantAuth = (req, status) => {
    console.log(status);
    return merchantTable.update({ Status: status }, { where: { id: req.query.MerchantID } });
};
Quries.blockProduct = (req) => {
    return productTable.update({ Status: -1 }, { where: { id: req.query.ProductID } });
};

Quries.getMerchant = (req) => {
    return merchantTable.findAll({ where: { id: req.query.id } });
};


Quries.getAllMerchant = (req) => {
    const paginationDetails = paginition.paginition(req);
    return merchantTable.findAll({
        attributes: { exclude: ['password'] },
        offset: +paginationDetails.offset,
        limit: +paginationDetails.limit,
    });
};

Quries.getAllCustomer = (req) => {
    const paginationDetails = paginition.paginition(req);
    return customerTable.findAll({
        attributes: { exclude: ['password'] },
        offset: +paginationDetails.offset,
        limit: +paginationDetails.limit,
    });
};


Quries.getOneMerchant = (req) => {
    return merchantTable.findAll({ where: { id: req.query.id } });
};

Quries.getOneCustomer = (req) => {
    return customerTable.findAll({ where: { id: req.query.id } });
};




module.exports = Quries;

