const { Sequelize, DataTypes } = require('sequelize');
const con = require('../../dbConfig');

let Users = con.define("Register", {
      id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
      },
      name: DataTypes.STRING,
      email: {
            type: DataTypes.STRING,
      },
      phone: {
            type: DataTypes.STRING
      },
      password: {
            type: DataTypes.STRING
      },
      step: {
            type: DataTypes.STRING,
      },
      Status: {
            type: DataTypes.STRING,
      }
})

Users.sync({ force: false })
      .then(() => {
            console.log("yes re-sync");
      })

module.exports = Users;

