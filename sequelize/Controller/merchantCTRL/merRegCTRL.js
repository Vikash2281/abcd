const merchantQueries = require("../../services/merchantService");
const responce = require("../helperCTRL/response");

exports.merRegister = async (req, res, next) => {

    try {

        const row = await merchantQueries.checkDetails(req);

        if (row.length != 0) {
            return responce.onlyMsg(req, res, 409, "email already exists")
        }

        await merchantQueries.createMerchant(req);

        return responce.onlyMsg(req, res, 200, "you will be varified in some time")

    } catch (err) {
        responce.onlyMsg(req, res, 500, "internal server error")
    }
}