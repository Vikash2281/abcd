const tokenDecode = require('../helperCTRL/tokenDecode');
const product = require('../../Models/productModel/productModel');
const responce = require("../helperCTRL/response");
const productTable = require("../../services/productService");

exports.updateProduct = async (req, res, next) => {
    try {

        const decoded = tokenDecode.tokenDecode(req);

        if (decoded.userType != "merchant") {

            return responce.onlyMsg(req, res, 401, "Dont have authority")
        }

        const findProduct = await product.findAll({ where: { id: req.body.id } })

        if (findProduct.length == 0) {

            return responce.onlyMsg(req, res, 404, "No product found")
        }

        let stock = (req.body.quantity ?? 0);
        let price = (req.body.price ?? 0);
        let discount = (req.body.discount ?? 0);

        const Product = await productTable.updateProduct(stock, price, discount, req);

        //await cartQuery.QueryUpdateCartItem(findProduct[0].id, Product)

        return responce.onlyMsg(req, res, 200, "Product updated")

    } catch (err) {
        next(err);
    }
}