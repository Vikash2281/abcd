const responce = require("../helperCTRL/response");
const tokenDecode = require('../helperCTRL/tokenDecode');
const cartQuries = require('../../services/cartItemService');
const Code = require("http-status-codes");

const deleteCart = async (req, res, next) => {
    try {
        const decoded = tokenDecode.tokenDecode(req);

        const row = await cartQuries.getCartItems(decoded.id)

        if (row.length == 0) {
            return responce.onlyMsg(req, res, Code.StatusCodes.NOT_FOUND, "No cart found")
        }

        await cartQuries.QueryEmptyCart(decoded.id);

        return responce.onlyMsg(req, res, Code.StatusCodes.ACCEPTED, "Cart is empty now")

    } catch (error) {
        next(error);
    }
};
module.exports = {
    deleteCart,
};