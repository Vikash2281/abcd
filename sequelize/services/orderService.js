const addressTable = require('../Models/customerModel/addressModel');
const cartTable = require('../Models/cardModel/cartItemsModel');
const orderTable = require('../Models/productModel/orderModel');
const orderItemTable = require('../Models/productModel/orderItemsModel.js');
const productTable = require('../Models/productModel/productModel');
const paymentTable = require('../Models/paymentModel.js/payment');

let Query = {}

Query.findAddress = (req, CustomerID) => {
    return addressTable.findAll({ where: { id: req.body.addressID, Cus_ID: CustomerID } })
};

Query.getCart = (CustomerID) => {
    return cartTable.findAll({
        attributes: {
            exclude: ['id']
        }, where: { CustomerID: CustomerID },
        raw: true
    })
};

Query.createOrder = (address, customer, finalPrice, finalQuantity, shippingCharge) => {

    return orderTable.create({
        totalQuantity: finalQuantity, totalPayableAmount: finalPrice,
        address: address, customerID: customer, shippingCharge: shippingCharge
    });
};

Query.createOrderItems = (data) => {
    // console.log(data);
    return orderItemTable.bulkCreate(data)
};

Query.UpdateStock = (data, condition) => {
    return productTable.bulkCreate(data, condition)
}

Query.paymentDetails = (OrderID, amount, paymentId) => {

    return paymentTable.create({ totalAmount: amount, OrderID: OrderID, paymentId: paymentId })
}

module.exports = Query;