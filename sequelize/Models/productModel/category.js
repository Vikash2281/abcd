const { Sequelize, DataTypes } = require('sequelize');
const con = require('../../dbConfig');

const Category = con.define("Category", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    Category: {
        type: DataTypes.STRING,
    }
})


const subCategory = con.define("subCategory", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    subCategory: {
        type: DataTypes.STRING,
    }
})

Category.hasMany(subCategory);
subCategory.belongsTo(Category);

Category.sync({ force: false })
    .then(() => {
        console.log("yes re-sync");
    })
subCategory.sync({ force: false })
    .then(() => {
        console.log("yes re-sync");
    })

const tables = {};
tables.Category = Category;
tables.subCategory = subCategory;

module.exports = tables;

