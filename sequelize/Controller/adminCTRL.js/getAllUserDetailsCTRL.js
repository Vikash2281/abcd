const adminQuries = require('../../services/adminService');
const responce = require("../helperCTRL/response");
const tokenDecode = require('../helperCTRL/tokenDecode');


exports.getUserDetails = async (req, res, next) => {

    try {

        const decoded = tokenDecode.tokenDecode(req);

        if (decoded.userType != "admin") {
            return responce.onlyMsg(req, res, 401, "Dont have authority")
        }

        if (req.query.userType == "Merchant") {

            if (req.query.id) {

                const row = await adminQuries.getOneMerchant(req);

                if (row.length == 0) {
                    return responce.onlyMsg(req, res, 404, "No merchant found")
                }

                return responce.withData(req, res, 200, row, "Merchant Details")
            }

            const row = await adminQuries.getAllMerchant(req);

            if (row.length == 0) {
                return responce.onlyMsg(req, res, 404, "No merchant found")
            }
            userStatusCount(req, res, row, next, "merchant Details")

        }
        else if (req.query.userType == "Customer") {

            if (req.query.id) {

                const row = await adminQuries.getOneCustomer(req);

                if (row.length == 0) {
                    return responce.onlyMsg(req, res, 404, "No Customer found")
                }
                return responce.withData(req, res, 200, row, "Customer Details")

            }

            const row = await adminQuries.getAllCustomer(req);

            if (row.length == 0) {
                return responce.onlyMsg(req, res, 404, "No Customer found")
            }

            userStatusCount(req, res, row, next, "customer Details")
        }
        else {
            return responce.onlyMsg(req, res, 400, "select correct userType")
        }

    }
    catch (err) {
        next(err);
    }
};


const userStatusCount = (req, res, row, next, msg) => {

    if (row.length == 0) {
        return responce.onlyMsg(req, res, 404, "invalid details")
    }

    let blockedCount = 0;
    let unverifiedCount = 0;
    let verifiedCount = 0;
    let totelCount = 0

    for (let key in row) {
        if (row[key].Status == "Blocked") {
            blockedCount++;
        }
        else if (row[key].Status == "Unverify") {
            unverifiedCount++;
        }

        else if (row[key].Status == "Verified") {
            verifiedCount++;
        }
    }

    totelCount = blockedCount + unverifiedCount + verifiedCount;

    let data = {
        Total_Count: totelCount,
        Verify: verifiedCount,
        UnVerify: unverifiedCount,
        Blocked: blockedCount,
        User: row
    }

    return responce.withData(req, res, 200, data, msg)
}




