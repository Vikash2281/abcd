const tokenDecode = require('../helperCTRL/tokenDecode');
const adminQueries = require("../../services/adminService")
const responce = require("../helperCTRL/response");

exports.blockUser = async (req, res, next) => {

    try {

        const decoded = tokenDecode.tokenDecode(req);

        if (decoded.userType != 'admin') {

            return responce.onlyMsg(req, res, 401, "Dont have authority")
        }

        else if (req.query.CustomerID) {

            console.log(" xjas");
            await adminQueries.blockCustomer(req, "Blocked");

            return responce.onlyMsg(req, res, 200, "customer is blocked")
        }

        else if (req.query.MerchantID) {

            await adminQueries.merchantAuth(req, "Blocked");

            return responce.onlyMsg(req, res, 200, "Merchant is blocked")
        }
        else if (req.query.ProductID) {

            await adminQueries.blockProduct(req);

            return responce.onlyMsg(req, res, 200, "Product is blocked")
        }
        else {
            return responce.onlyMsg(req, res, 400, "Invalid Details")
        }

    } catch (err) {
        next(err);
    }
}