const { Sequelize, DataTypes } = require('sequelize');


const db_connection = new Sequelize('db', 'root', 'root@123', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

db_connection.authenticate()
    .then(() => {
        console.log("connected!");
    }).catch(err => {
        ''
        console.log("error" + err);
    });


module.exports = db_connection;

/////////tree type of user merchent customer admin 
////////cus reg - normal reg email pass ph then dasgboard 
/////then one step only dashboard show product
////merchent reg - afre details admin will verify after verofy a mail will be send tu merchent then he will set password
///mercgent will creats category then add products
///stock out of stock concept
//then user will see product in list in pagination//email will verify
//user will serch product 
//admin can see user listing no of user , no of active , non active , blocked, same for merchent admin can also blocked product 
//merchent can see only those users whome purchese theret producth