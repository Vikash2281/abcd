const productTable = require('../Models/productModel/productModel');
const Category = require("../Models/productModel/category")
const Merchant = require("../Models/MerchantModel/merchantmodels/merRegModel");
const { Sequelize, Op } = require('sequelize');
const paginition = require("../Controller/helperCTRL/pagination");

const Query = {}

Query.getProducts = (req) => {
    const paginationDetails = paginition.paginition(req);
    return productTable.findAll({
        include: [
            {
                model: Merchant,
                attributes: ["name"],
            },
            {
                model: Category.Category,
                attributes: ["Category"],
            },
            {
                model: Category.subCategory,
                attributes: ["subCategory"],
            },
        ],
        attributes: {
            exclude: [
                "SubCategoryID", "categoryID", "createdAt", "updatedAt", "merchantID", "Status",
            ],
        },
        where: {
            [Op.not]: [
                { Status: -1 }
            ]
        },
        offset: +paginationDetails.offset,
        limit: +paginationDetails.limit,
    });
};

Query.updateProduct = (stock, price, discount, req) => {
    return productTable.update({ Stock: stock, Price: price, Discount: discount }, { where: { id: req.body.id } })
};

Query.updateAfterOrder = (productID, quantity) => {
    return productTable.update({ Stock: quantity }, { where: { id: productID } })
};

Query.findProduct = (productID) => {
    return productTable.findAll({ where: { id: productID } })
};

Query.deleteProduct = (req, merchantid) => {
    return productTable.destroy({ where: { id: req.body.id, MerchantID: merchantid } });
};

Query.findOneMerchnatProduct = (merchnatID, req) => {
    const paginationDetails = paginition.paginition(req);
    return productTable.findAll({
        include: [
            {
                model: Merchant,
                attributes: ["name", "id"],
            },
            {
                model: Category.Category,
                attributes: ["Category"],
            },
            {
                model: Category.subCategory,
                attributes: ["subCategory"],
            },
        ],
        attributes: {
            exclude: ["SubCategoryID", "categoryID", "createdAt", "updatedAt", "merchantID", "Status",],
        },
        where: { merchantID: merchnatID },
        offset: +paginationDetails.offset,
        limit: +paginationDetails.limit,
    });

};

module.exports = Query;