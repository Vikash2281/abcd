const { Sequelize, DataTypes } = require('sequelize');
const con = require('../../dbConfig');
const Customer = require('./registerModule');

let userAddress = con.define("userAddress", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    address: {
        type: DataTypes.STRING,
    }
})

Customer.hasMany(userAddress, { foreignKey: "Cus_ID" });
userAddress.belongsTo(Customer, { foreignKey: "Cus_ID" });

userAddress.sync({ force: false })
    .then(() => {
        console.log("yes re-sync");
    })

module.exports = userAddress;

