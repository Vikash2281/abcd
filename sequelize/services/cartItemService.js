const Cart_Item = require("../Models/cardModel/cartItemsModel");
const productTable = require("../Models/productModel/productModel");
const { Sequelize, Op } = require('sequelize');
const pagination = require("../Controller/helperCTRL/pagination");

let Query = {}

Query.QueryGetAllCartItems = () => {
    return Cart_Item.findAll();
};

Query.QueryListOfProducts = (arr) => {

    return productTable.findAll({ where: { [Op.or]: { id: arr } }, raw: true });
}


Query.findProduct = (req) => {
    return productTable.findAll({ where: { id: req.body.productId } });
};
Query.checkProductinCart = (req, cusID) => {
    return Cart_Item.findAll({ where: { ProductID: req.body.productId, CustomerID: cusID } });
};

Query.getCartItems = (CustomerID, req) => {
    //  const paginationDetails = pagination.paginition(req);
    return Cart_Item.findAll({
        where: { CustomerID: CustomerID }, raw: true
        // offset: +paginationDetails.offset,
        // limit: +paginationDetails.limit,
    });
};

Query.QueryGetOneCartItem = (condition) => {
    return Cart_Item.findOne(condition);
};
Query.QueryCreateCartItem = (data) => {
    return Cart_Item.create(data);
};
Query.QueryUpdateCartItem = (data, condition) => {
    return Cart_Item.update(data, condition);
};
Query.QueryDeleteOneCartItem = (condition) => {
    return Cart_Item.destroy(condition);
};
Query.QueryEmptyCart = (customerID) => {
    return Cart_Item.destroy({ where: { CustomerID: customerID } });
};

Query.updateCart = (productId) => {
    return Cart_Item.update({ where: { ProductID: productId } });
};

Query.find = (arr) => {
    return productTable.findAll({ price, discount }, { where: { [Op.and]: arr }, raw: true });
};

Query.BulkupdateCart = (data, condition) => {
    return Cart_Item.bulkCreate(data, condition)
}

Query.updateCart2 = (cusid, productId, price, Discount, DisPrice) => {
    return Cart_Item.update({ price: price, Discount: Discount, DiscountedPrice: DisPrice }, { where: { customerID: cusid, ProductID: productId } });
};
module.exports = Query;