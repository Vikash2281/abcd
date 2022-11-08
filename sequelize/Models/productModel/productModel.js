const { Sequelize, DataTypes } = require('sequelize');
const con = require('../../dbConfig');
const tables = require("../productModel/category")
const Merchant = require("../MerchantModel/merchantmodels/merRegModel")

let product = con.define("Product", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    Name: {
        type: DataTypes.STRING,
    },
    Price: {
        type: DataTypes.INTEGER,
    },
    Discount: {
        type: DataTypes.DECIMAL,
    },
    Des: {
        type: DataTypes.STRING,
    },
    Stock: {
        type: DataTypes.INTEGER,
    },
    Status: {
        type: DataTypes.INTEGER,
    },
    HSNCode: {
        type: DataTypes.INTEGER,
    },
})

tables.Category.hasMany(product, { foreignKey: "CategoryID" });
product.belongsTo(tables.Category, { foreignKey: "CategoryID" });

tables.subCategory.hasMany(product, { foreignKey: "subCategoryID" });
product.belongsTo(tables.subCategory, { foreignKey: "subCategoryID" });

Merchant.hasMany(product, { foreignKey: "MerchantID" });
product.belongsTo(Merchant, { foreignKey: "MerchantID" });

product.sync({ alter: false })
    .then(() => {
        console.log("yes re-sync");
    })

module.exports = product;

