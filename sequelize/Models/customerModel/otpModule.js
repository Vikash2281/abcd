const { Sequelize, DataTypes } = require('sequelize');
const con = require('../../dbConfig');


let Users = con.define("OTP1", {
  email: {
    type: DataTypes.STRING,
  },

  OTP: {
    type: DataTypes.STRING,
  },


  timestamp: {
    type: DataTypes.STRING,
  }



})

Users.sync({ force: false })
  .then(() => {
    console.log("yes re-sync");
  })

module.exports = Users;
