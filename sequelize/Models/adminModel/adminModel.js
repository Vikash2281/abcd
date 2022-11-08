const { Sequelize,DataTypes, where} = require('sequelize');
const con = require('../../dbConfig');

let Users = con.define("Admin", {
      id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
      name: DataTypes.STRING,
      email: {
            type: DataTypes.STRING,
      },
      password: {
            type: DataTypes.STRING
      }
})

Users.sync({ force:false})
    .then(() => {
        console.log("yes re-sync");
    })

module.exports=Users;

