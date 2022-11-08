const productQueries = require('../../services/productService');
const responce = require("../helperCTRL/response");
const tokenDecode = require('../helperCTRL/tokenDecode');

exports.deleteProduct = async (req, res, next) => {

    try {

        const decoded = tokenDecode.tokenDecode(req);

        if (decoded.userType == "merchant") {

            let row1 = await productQueries.findProduct(req.body.id)
            if (row1.length == 0) {

                return responce.onlyMsg(req, res, 404, "No product found")
            }

            await productQueries.deleteProduct(req, decoded.id);

            return responce.onlyMsg(req, res, 200, "Product deleted")
        }
        else {
            return responce.onlyMsg(req, res, 401, "Dont have authority")
        }
    }
    catch (err) {
        next(err);
    }
}