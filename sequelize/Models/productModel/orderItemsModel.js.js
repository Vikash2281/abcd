const { Sequelize, DataTypes } = require('sequelize');
const con = require('../../dbConfig');
const Customer = require("../customerModel/registerModule");
const Merchant = require("../MerchantModel/merchantmodels/merRegModel");
const Order = require("./orderModel");

const orderItems = con.define(
    "orderItems",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER(11),
            required: true,
        },
        price: {
            type: DataTypes.DECIMAL(20, 2),
            allowNull: false,
        },
    },
    {
        timestamps: false,
        // tableName: "cart_items",
    }
);

Customer.hasMany(orderItems, { foreignKey: "CustomerID" });
orderItems.belongsTo(Customer, { foreignKey: "CustomerID" });

Merchant.hasMany(orderItems, { foreignKey: "MerchantID" });
orderItems.belongsTo(Merchant, { foreignKey: "MerchantID" });

Order.hasMany(orderItems, { foreignKey: "OrderID" });
orderItems.belongsTo(Order, { foreignKey: "OrderID" });

// orderItems.sync()
orderItems.sync({ force: false })
    .then(() => {
        console.log("yes rekjbsdkjszbdkzvlkbckzc-sync");
    })

module.exports = orderItems;