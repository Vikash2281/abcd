const merchantQueries = require("../../services/merchantService");
const responce = require("../helperCTRL/response");
const tokenDecode = require('../helperCTRL/tokenDecode');

exports.showCategories = async (req, res, next) => {

    try {

        const decoded = tokenDecode.tokenDecode(req);

        const showCategories = await merchantQueries.showcategories(req);

        if (showCategories.length == 0) {

            return responce.onlyMsg(req, res, 404, "No category found")
        }

        return responce.withData(req, res, 200, showCategories, "Categories Details")
    }
    catch (err) {
        next(err);
    }
};
