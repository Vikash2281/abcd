const jwt = require("jsonwebtoken");
const tokenVarification = require("../../tokenVarification");
const orderQuries = require('../../services/orderService');
const Code = require("http-status-codes");
const cartQuries = require('../../services/cartItemService');
var Sequelize = require('sequelize');
const productQuries = require('../../services/productService');
const Op = Sequelize.Op;


const p = async (req, res, next) => {
    try {

        tokenVarification(req, res);

        const theToken = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(theToken, "the-super-strong-secrect");

        const addressCheck = await orderQuries.findAddress(req, decoded.id)

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

        if (findCart.length == 0) {
            return res.json({
                Status: Code.ReasonPhrases.OK,
                StatusCode: Code.StatusCodes.NOT_FOUND,
                responce: {
                    message: "have nothing in cart"
                }
            });
        }

        let length = findCart.length
        let index = 0
        let totalQuantity = 0
        let totalPrice = 0;
        const arr = [];

        while (length != 0) {
            arr[index] = findCart[index].ProductID
            totalQuantity = totalQuantity + findCart[index].quantity

            totalPrice = totalPrice + findCart[index].DiscountedPrice
            // console.log(totalPrice);
            length--
            index++
        }

        const prodDetails = await cartQuries.QueryListOfProducts(arr)

        // length = findCart.length;
        // index = 0;
        // while (length != 0) {
        //     if (findCart[index].price != prodDetails[index].price && findCart[index].Discount != prodDetails[index].Discount) {
        //         console.log("hiii i am vikash");
        //     }
        //     index++;
        //     length--;
        // }



        // length = prodDetails.length
        // //  console.log(prodDetails);
        // index = 0;
        // let finalPrice = 0
        // while (length != 0) {

        //     if (prodDetails[index].Stock < findCart[index].quantity) {
        //         return res.json({
        //             Status: Code.ReasonPhrases.OK,
        //             StatusCode: Code.StatusCodes.NOT_FOUND,
        //             responce: {
        //                 message: "dont have enough quantity",
        //                 ProductID: findCart[index].ProductID,
        //                 ProductName: prodDetails[index].Name
        //             }
        //         });
        //     }

        //     findCart[index].price = prodDetails[index].Price
        //     findCart[index].MerchantID = prodDetails[index].MerchantID
        //     findCart[index].Discount = prodDetails[index].Discount
        //     findCart[index].DiscountedPrice = findCart[index].price * (100 - findCart[index].Discount) / 100
        //     finalPrice = finalPrice + (findCart[index].DiscountedPrice * findCart[index].quantity)
        //     prodDetails[index].Stock = prodDetails[index].Stock - findCart[index].quantity
        //     index++
        //     length--
        // }

        let shippingCharges = 0;
        if (totalPrice < 1000) {
            shippingCharges = 50;
            totalPrice = totalPrice + shippingCharges
        }
        console.log(totalQuantity);
        const Order = await orderQuries.createOrder(addressCheck[0].address, decoded.id, 1000, totalQuantity, shippingCharges);
        console.log("dsad");

        console.log(Order.id);
        length = findCart.length
        index = 0
        while (length != 0) {
            findCart[index].OrderID = Order.id
            prodDetails[index].Stock = prodDetails[index].Stock - findCart[index].quantity
            length--
            index++
        }
        console.log(findCart);
        //   console.log(prodDetails);
        const orderItem = await orderQuries.createOrderItems(findCart);

        await orderQuries.paymentDetails(Order.id, 1000);

        // length = findCart.length;
        // index = 0;
        // while (length > 0) {
        //     let row1 = await productQuries.findProduct(findCart[index].ProductID)
        //     let quantity = row1[0].Stock - findCart[index].quantity
        //     await productQuries.updateAfterOrder(findCart[index].ProductID, quantity);
        //     index++;
        //     length--;
        // }


        const checkUpdatedStock = await orderQuries.UpdateStock(prodDetails, { updateOnDuplicate: ["Stock"] })
        // console.log(orderItem);

        console.log(checkUpdatedStock);
        return res.json({
            Status: Code.ReasonPhrases.OK,
            StatusCode: Code.StatusCodes.OK,
            responce: {
                message: "order placed "
            }
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    p
};