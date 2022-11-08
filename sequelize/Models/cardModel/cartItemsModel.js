const { Sequelize, DataTypes } = require('sequelize');
const con = require('../../dbConfig');
const Customer = require("../customerModel/registerModule");
const Product = require("../productModel/productModel");
const Merchant = require("../MerchantModel/merchantmodels/merRegModel");

const Cart_Item = con.define(
    "cart_item",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER(11),
        },
        price: {
            type: DataTypes.DECIMAL(20, 2),
        },
        Discount: {
            type: DataTypes.DECIMAL(20, 2),
        },
        DiscountedPrice: {
            type: DataTypes.DECIMAL(20, 2),
        },
    },
    {
        timestamps: false,
        tableName: "cart_items",
    }
);

Customer.hasMany(Cart_Item, { foreignKey: "CustomerID" });
Cart_Item.belongsTo(Customer, { foreignKey: "CustomerID" });

Product.hasMany(Cart_Item, { foreignKey: "ProductID" });
Cart_Item.belongsTo(Product, { foreignKey: "ProductID" });

Merchant.hasMany(Cart_Item, { foreignKey: "MerchantID" });
Cart_Item.belongsTo(Merchant, { foreignKey: "MerchantID" });

Cart_Item.sync({ alter: false })
    .then(() => {
        console.log("cart sink");
    })

module.exports = Cart_Item;