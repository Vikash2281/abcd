const responce = require("../helperCTRL/response");
const tokenDecode = require('../helperCTRL/tokenDecode');
const merchantQueries = require('../../services/merchantService');
const Code = require("http-status-codes");

exports.addCategories = async (req, res, next) => {

    try {

        const decoded = tokenDecode.tokenDecode(req);

        if (decoded.userType == "merchant") {

            const category = await merchantQueries.categoryCreate(req);
            const subCategory = await merchantQueries.subCategoryCreate(req, category[0].id);

            return responce.onlyMsg(req, res, Code.StatusCodes.CREATED, "categories registred")
        }
        else {
            return responce.onlyMsg(req, res, Code.StatusCodes.UNAUTHORIZED, "Dont have authority")
        }
    }
    catch (err) {
        next(err);
    }
}