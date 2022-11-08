const merchantTable = require("../Models/MerchantModel/merchantmodels/merRegModel");
const categoriesTable = require("../Models/productModel/category");
const product = require('../Models/productModel/productModel');
const paginition = require("../Controller/helperCTRL/pagination");

Quries = {};

Quries.checkDetails = (req) => {
    return merchantTable.findAll({ where: { email: req.body.email } });
};

Quries.setPassword = (req, merchantID) => {
    return merchantTable.findAll({ where: { id: merchantID, }, attributes: { exclude: ['password'] } });

};

Quries.showcategories = (req) => {
    return categoriesTable.Category.findAll({
        include: [{
            model: categoriesTable.subCategory,
            attributes: ['subCategory'],
        }],
        attributes: { exclude: ['createdAt', 'updatedAt', 'CategoryID'] },
        // offset: +paginition.offset,
        // limit: +paginition.limit,
    })
};

Quries.createMerchant = (req) => {
    return merchantTable.create({ name: req.body.name, email: req.body.email, phone: req.body.phone, CompanyName: req.body.CompanyName, Status: "Unverify" });

};

Quries.categoryCheck = (req) => {
    return categoriesTable.Category.findAll({ where: { Category: req.query.Category } })

};

Quries.subCategoryCheck = (req) => {
    return categoriesTable.subCategory.findAll({ where: { subCategory: req.query.subCategory } });

};

Quries.productCheck = (req) => {
    return product.findAll({ where: { Name: req.body.name } })

};

Quries.productCreate = (req, CategoryID, subCAtegoryID, MerchantID) => {
    return product.create({
        Name: req.body.name, Price: req.body.price, Des: req.body.des, Stock: req.body.stock,
        CategoryID: CategoryID, subCategoryID: subCAtegoryID, MerchantID: MerchantID, Status: 1, Discount: req.body.discount, HSNCode: req.body.hsncode
    });
};

Quries.categoryCreate = (req) => {
    return categoriesTable.Category.findOrCreate({ where: { Category: req.body.category } });

};


Quries.subCategoryCreate = (req, CategoryID) => {
    return categoriesTable.subCategory.findOrCreate({ where: { subCategory: req.body.subCategory, CategoryId: CategoryID } });

};
module.exports = Quries;

