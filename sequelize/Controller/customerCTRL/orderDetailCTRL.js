const responce = require("../helperCTRL/response");
const tokenDecode = require('../helperCTRL/tokenDecode');
const customerTable = require("../../Models/customerModel/registerModule");
const orderTable = require("../../Models/productModel/orderItemsModel.js");
const Code = require("http-status-codes");

exports.getOrderDetails = async (req, res, next) => {

    try {

        const decoded = tokenDecode.tokenDecode(req);

        let PageNumber = req.query.page ?? 1;
        let limit = req.query.limit ?? 10;
        let offset = (PageNumber - 1) * limit;

        if (decoded.userType == "merchant") {

            const orders = await orderTable.findAll({
                include: [{
                    model: customerTable,
                    attributes: ['name'],

                }],
                attributes: { exclude: ['CustomerID', 'createdAt', 'updatedAt', 'MerchantID', 'id'] },
                where: { MerchantID: decoded.id },
                offset: +offset,
                limit: +limit,
            })

            if (orders.length == 0) {
                return responce.onlyMsg(req, res, Code.StatusCodes.NOT_FOUND, "No orders found")

            }

            return responce.withData(req, res, Code.StatusCodes.OK, orders, "Details")

        }

        else if (decoded.userType == "customer") {


            const orders = await orderTable.findAll({
                attributes: { exclude: ['CategoryID', 'createdAt', 'updatedAt', 'MerchantID', 'id'] },
                where: { customerID: decoded.id },
                offset: +offset,
                limit: +limit,
            })
            if (orders.length == 0) {
                return responce.onlyMsg(req, res, Code.StatusCodes.NOT_FOUND, "No orders found")
            }
            return responce.withData(req, res, Code.StatusCodes.OK, orders, "Details")

        }

        else if (decoded.userType == "admin") {

            const orders = await orderTable.findAll({
                attributes: { exclude: ['CategoryID', 'createdAt', 'updatedAt', 'MerchantID', 'id'] },
                offset: +offset,
                limit: +limit,
            })
            if (orders.length == 0) {
                return responce.onlyMsg(req, res, Code.StatusCodes.NOT_FOUND, "No orders found")
            }
            return responce.withData(req, res, Code.StatusCodes.OK, orders, "Details")
        }
    }
    catch (err) {
        next(err);
    }
};

///////////////////////////////delet all data
///////////////////////////////add 10 merchant
//////////////////////////////every merchant has 3 category
///////////////////////every merchnat has 10 produvt in each category 
//////////////////////have 5 users
/////////////////////4 users will order in every merchnat 2 items from each category 60 orders
/////////////////////