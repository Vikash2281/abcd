const Category = require("../../Models/productModel/category");
const Product = require("../../Models/productModel/productModel");
const Merchant = require("../../Models/MerchantModel/merchantmodels/merRegModel");

exports.searchProduct = async (req, res, next) => {
    try {
        if (Object.keys(req.query).length == 0) {
            allProduct(req, res, next);
        } else if ("product" in req.query) {
            if (req.query.product) {
                productByName(req, res, next);
            } else {
                allProduct(req, res, next);
            }
        } else if ("subCategory" in req.query) {
            if (req.query.subCategory) {
                productBySubCategory(req, res, next);
            } else {
                allProduct(req, res, next);
            }
        } else if ("Category" in req.query) {
            if (req.query.Category) {
                productCategories(req, res, next);
            } else {
                allProduct(req, res, next);
            }
        } else {
            return res.status(201).json({
                message: "Enter valid details",
            });
        }
    } catch (err) {
        next(err);
    }
};

const allProduct = async (req, res, next) => {
    try {
        const product = await Product.findAll({
            include: [
                {
                    model: Category.Category,
                    attributes: ["Category"],
                },
                {
                    model: Category.subCategory,
                    attributes: ["subCategory"],
                },
                {
                    model: Merchant,
                    attributes: ["name"],
                },
            ],
            attributes: {
                exclude: [
                    "subCategoryID",
                    "CategoryID",
                    "createdAt",
                    "updatedAt",
                    "MerchantID",
                ],
            },
        });

        return res.status(201).json({
            message: "product ",
            Products: product[0],
        });
    } catch (err) {
        next(err);
    }
};

const productByName = async (req, res, next) => {
    try {
        const product = await Product.findAll({
            include: [
                {
                    model: Category.Category,
                    attributes: ["Category"],
                },
                {
                    model: Category.subCategory,
                    attributes: ["subCategory"],
                },
                {
                    model: Merchant,
                    attributes: ["name"],
                },
            ],
            attributes: {
                exclude: [
                    "subCategoryID",
                    "CategoryID",
                    "createdAt",
                    "updatedAt",
                    "MerchantID",
                ],
            },
            where: { Name: req.query.product },
        });

        if (product.length == 0) {
            return res.status(201).json({
                message: "product does not exist",
            });
        } else {
            return res.status(201).json({
                message: "product ",
                Products: product[0],
            });
        }
    } catch (err) {
        next(err);
    }
};

const productBySubCategory = async (req, res, next) => {
    try {
        const id = await Category.subCategory.findAll({
            where: { subCategory: req.query.subCategory },
        });

        if (id.length == 0) {
            return res.status(201).json({
                message: "product related to this category does not exist",
            });
        }
        const product = await Product.findAll({
            include: [
                {
                    model: Category.Category,
                    attributes: ["Category"],
                },
                {
                    model: Category.subCategory,
                    attributes: ["subCategory"],
                },
                {
                    model: Merchant,
                    attributes: ["name"],
                },
            ],
            attributes: {
                exclude: [
                    "subCategoryID",
                    "CategoryID",
                    "createdAt",
                    "updatedAt",
                    "MerchantID",
                ],
            },
            where: { subCategoryID: id[0].id },
        });

        if (product.length == 0) {
            return res.status(201).json({
                message: "product does not exist",
            });
        } else {
            return res.status(201).json({
                message: "product ",
                Products: product[0],
            });
        }
    } catch (err) {
        next(err);
    }
};

const productCategories = async (req, res, next) => {
    try {
        const id = await Category.Category.findAll({
            where: { Category: req.query.Category },
        });

        if (id.length == 0) {
            return res.status(201).json({
                message: "product related to this category does not exist",
            });
        }
        const product = await Product.findAll({
            include: [
                {
                    model: Category.Category,
                    attributes: ["Category"],
                },
                {
                    model: Category.subCategory,
                    attributes: ["subCategory"],
                },
                {
                    model: Merchant,
                    attributes: ["name"],
                },
            ],
            attributes: {
                exclude: [
                    "subCategoryID",
                    "CategoryID",
                    "createdAt",
                    "updatedAt",
                    "MerchantID",
                ],
            },
            where: { CategoryID: id[0].id },
        });

        if (product.length == 0) {
            return res.status(201).json({
                message: "product does not exist",
            });
        } else {
            return res.status(201).json({
                message: "product ",
                Products: product[0],
            });
        }
    } catch (err) {
        next(err);
    }
};

// const { Op } = require('sequelize');
// exports.searchProduct = async (req, res, next) => {

//     try {
//         let category, subcategory, product = ''

//         req.query.product ? product = { [Op.like]: req.query.product } : product = { [Op.not]: null }
//         req.query.subcategory ? subcategory = { [Op.like]: req.query.subcategory } : subcategory = { [Op.not]: null }
//         req.query.category ? category = { [Op.like]: req.query.category } : category = { [Op.not]: null }

//         const data = await Product.findAll({
//             include: [{
//                 model: Category.Category,
//                 attributes: ['Category'],
//                 where: { Category: category }
//             }, {
//                 model:Category.subCategory,
//                 attributes: ['subCategory'],
//                 where: { subCategory: subcategory }
//             }],
//             where: { Name: product },
//             attributes: { exclude: ['subcategory_id', 'Category_ID', 'createdAt', 'updatedAt'] }
//         })
//         res.send(data)
//     } catch (err) {
//         next(err)
//     }
// }
