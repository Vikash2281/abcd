const { Sequelize, DataTypes } = require("sequelize");
const con = require("../../dbConfig");
const Order = require("../productModel/orderModel");

const Payment = con.define("Payment", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    totalAmount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    paymentId: {
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

Order.hasOne(Payment, { foreignKey: "OrderID", });
Payment.belongsTo(Order, { foreignKey: "OrderID" });

Payment.sync({ force: false });

module.exports = Payment;