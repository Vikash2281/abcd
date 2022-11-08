const { Sequelize, DataTypes } = require("sequelize");
const con = require("../../dbConfig");
const Customer = require("../customerModel/registerModule");

const Order = con.define("Orders", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    totalQuantity: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    shippingCharges: {
        type: DataTypes.DECIMAL(20, 2),
        defaultValue: 0,
    },
    totalPayableAmount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    updatedAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
});
Customer.hasMany(Order, { foreignKey: "customerID", });
Order.belongsTo(Customer, { foreignKey: "customerID" });

Order.sync({ alter: false });

module.exports = Order;