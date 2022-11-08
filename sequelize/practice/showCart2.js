const jwt = require("jsonwebtoken");
const cartQuries = require('../services/cartItemService');
const tokenVarification = require("../tokenVarification");
const Code = require("http-status-codes");
const { Sequelize, Op } = require('sequelize');

const showCart2 = async (req, res, next) => {
    try {

        tokenVarification(req);

        const theToken = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(theToken, "the-super-strong-secrect");

        const rows = await cartQuries.getCartItems(decoded.id)

        if (rows.length == 0) {
            return res.json({
                Status: Code.ReasonPhrases.OK,
                StatusCode: Code.StatusCodes.NOT_FOUND,
                responce: {
                    message: "no cart found",
                }
            });
        }

        let length = rows.length
        let index = 0
        let totalQuantity = 0
        const cartItemProductId = {}
        const arr = [];
        while (length != 0) {
            // cartItemProductId["id"]=rows[index].productId
            arr[index] = { id: rows[index].productId }
            totalQuantity = totalQuantity + rows[index].quantity
            length--
            index++
        }
        const cartProductDetails = await QueryListOfProducts({
            attributes: ["price", "discount"],
            where: {
                [Op.or]: arr
            },
            raw: true
        })
        // console.log(cartProductDetails);
        length = cartProductDetails.length
        index = 0;
        let totalCartValue = 0
        while (length != 0) {
            rows[index].price = cartProductDetails[index].price
            rows[index].discount = cartProductDetails[index].discount
            rows[index].discountedPrice = rows[index].price * (100 - rows[index].discount) / 100
            totalCartValue = totalCartValue + (rows[index].discountedPrice * rows[index].quantity)
            index++
            length--
        }
        await QueryBulkUpdateCartItem(rows, { updateOnDuplicate: ["price", "discount", "discountedPrice"] })

        const cartItemsDetails = await QueryListOfCartItems({ customerId: decoded.id });
        length = cartItemsDetails.length
        index = 0
        while (length != 0) {
            cartItemsDetails[index].discount = (cartItemsDetails[index].discount * cartItemsDetails[index].price) / 100
            length--
            index++
        }
        return ok(res, {
            totalCartValue: totalCartValue,
            totalQuantity: totalQuantity,
            cart: cartItemsDetails,
        });

    } catch (error) {
        next(error);
    }
};
module.exports = {
    showCart2,
};



