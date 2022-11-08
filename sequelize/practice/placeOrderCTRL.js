const jwt = require("jsonwebtoken");
const tokenVarification = require("../tokenVarification");
const orderQuries = require('../services/orderService');
const Code = require("http-status-codes");
const productQuries = require('../services/productService');

exports.placeOrder = async (req, res, next) => {

    try {

        tokenVarification(req, res);

        const theToken = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(theToken, "the-super-strong-secrect");

        const addressCheck = await orderQuries.findAddress(req, decoded.id)

        if (addressCheck.length == 0) {
            return res.json({
                Status: Code.ReasonPhrases.OK,
                StatusCode: Code.StatusCodes.NOT_FOUND,
                responce: {
                    message: "this address does not exist please add this address then place order "
                }
            });
        }

        const getCart = await orderQuries.getCart(decoded.id);

        if (getCart == 0) {
            return res.json({
                Status: Code.ReasonPhrases.OK,
                StatusCode: Code.StatusCodes.NOT_FOUND,
                responce: {
                    message: "have nothing in cart"
                }
            });
        }

        let finalPrice = 0;
        let finalQuantity = 0;
        let i = 0;
        while (getCart.length > i) {

            finalPrice = finalPrice + (+getCart[i].price);
            finalQuantity = finalQuantity + getCart[i].quantity;
            i++;
        }

        let shippingCharge = 0;
        if (finalPrice < 1000) {

            shippingCharge = 50;
            finalPrice = shippingCharge + finalPrice
        }

        const row = await orderQuries.createOrder(req, getCart, finalPrice, finalQuantity, shippingCharge);

        length = getCart.length;
        i = 0;
        while (length != 0) {
            getCart[i].OrderID = row.id;
            let row1 = await productQuries.findProduct(getCart[i].ProductID)
            let quantity = row1[0].Stock - getCart[i].quantity
            await productQuries.updateAfterOrder(getCart[i].ProductID, quantity);
            console.log(getCart[i].quantity);
            i++;
            length--;
        }
        await orderQuries.createOrderItems(getCart);

        return res.json({
            Status: Code.ReasonPhrases.OK,
            StatusCode: Code.StatusCodes.OK,
            responce: {
                message: "order placed "
            }
        });
    }
    catch (err) {
        next(err);
    }
};
