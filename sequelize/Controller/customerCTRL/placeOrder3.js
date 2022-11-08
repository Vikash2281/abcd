const responce = require("../helperCTRL/response");
const tokenDecode = require('../helperCTRL/tokenDecode');
const orderQuries = require('../../services/orderService');
const Code = require("http-status-codes");
const cartQuries = require('../../services/cartItemService');
const makePayment = require('../helperCTRL/test');


const placeOrder3 = async (req, res, next) => {
    try {

        const decoded = tokenDecode.tokenDecode(req);

        // const addressCheck = await orderQuries.findAddress(req, decoded.id)

        // if (addressCheck.length == 0) {
        //     return res.json({
        //         Status: Code.ReasonPhrases.OK,
        //         StatusCode: Code.StatusCodes.NOT_FOUND,
        //         responce: {
        //             message: "this address does not exist "
        //         }
        //     });
        // }

        const findCart = await orderQuries.getCart(decoded.id);

        //  console.log(findCart);
        if (findCart.length == 0) {
            return responce.onlyMsg(req, res, Code.StatusCodes.NOT_FOUND, "Have nothing in cart")
        }

        let length = findCart.length
        let index = 0
        let totalQuantity = 0
        let totalPrice = 0;
        const arr = [];

        while (length != 0) {
            arr[index] = findCart[index].ProductID
            totalQuantity = totalQuantity + findCart[index].quantity
            totalPrice = totalPrice + (+findCart[index].DiscountedPrice)
            length--
            index++
        }


        const prodDetails = await cartQuries.QueryListOfProducts(arr);

        length = findCart.length;
        index = 0;
        while (length != 0) {
            if (findCart[index].price != prodDetails[index].Price && findCart[index].Discount != prodDetails[index].Discount) {
                return responce.withData(req, res, Code.StatusCodes.NOT_FOUND, prodDetails[index].id, "change in product plz see the cart")

            }
            index++;
            length--;
        }

        let shippingCharges = 0;
        if (totalPrice < 1000) {
            shippingCharges = 50;
            totalPrice = totalPrice + shippingCharges
        }


        const paymentDetails = await makePayment.test(req, res, totalPrice, decoded.id)

        console.log(paymentDetails);
        if (paymentDetails.status != "succeeded") {

            return responce.onlyMsg(req, res, Code.StatusCodes.BAD_REQUEST, "Payment Failed")
        }

        const Order = await orderQuries.createOrder(req.body.address, decoded.id, totalPrice, totalQuantity, shippingCharges);

        length = findCart.length
        index = 0
        while (length != 0) {
            findCart[index].OrderID = Order.id
            prodDetails[index].Stock = prodDetails[index].Stock - findCart[index].quantity
            length--
            index++
        }
        const orderItem = await orderQuries.createOrderItems(findCart);

        await orderQuries.paymentDetails(Order.id, totalPrice, paymentDetails.id);

        const checkUpdatedStock = await orderQuries.UpdateStock(prodDetails, { updateOnDuplicate: ["Stock"] })

        return responce.onlyMsg(req, res, Code.StatusCodes.OK, "Order Placed")

    } catch (err) {
        next(err);
    }
};

module.exports = {
    placeOrder3,
};