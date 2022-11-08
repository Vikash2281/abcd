const responce = require("../helperCTRL/response");
const tokenDecode = require('../helperCTRL/tokenDecode');
const merchantQueries = require('../../services/merchantService');

exports.addProduct = async (req, res, next) => {
    try {

        const decoded = tokenDecode.tokenDecode(req);

        if (decoded.userType != "merchant") {
            return responce.onlyMsg(req, res, 401, "Dont have authority")

        }

        const category = await merchantQueries.categoryCheck(req);
        const subCategory = await merchantQueries.subCategoryCheck(req);

        if (category.length == 0 || subCategory.length == 0) {
            return responce.onlyMsg(req, res, 422, "enter valid categories")

        }

        const productCheck = await merchantQueries.productCheck(req);
        console.log(productCheck);

        if (productCheck.length != 0) {
            return responce.onlyMsg(req, res, 409, "already entyered this product, increse the stock")

        }
        await merchantQueries.productCreate(req, category[0].id, subCategory[0].id, decoded.id);

        return responce.onlyMsg(req, res, 200, "product added")

    } catch (err) {
        next(err);
    }
}