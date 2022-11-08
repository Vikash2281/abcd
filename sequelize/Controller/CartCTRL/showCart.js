const cartQuries = require('../../services/cartItemService');
const Code = require("http-status-codes");
const responce = require("../helperCTRL/response");
const tokenDecode = require('../helperCTRL/tokenDecode');

const showCart = async (req, res, next) => {
    try {

        const decoded = tokenDecode.tokenDecode(req);

        let findCart = await cartQuries.getCartItems(decoded.id, req)

        if (findCart.length == 0) {
            return responce.onlyMsg(req, res, Code.StatusCodes.NOT_FOUND, "No cart found")

        }

        let length = findCart.length
        let index = 0
        let totalQuantity = 0
        const arr = [];
        while (length != 0) {
            arr[index] = findCart[index].ProductID
            totalQuantity = totalQuantity + findCart[index].quantity
            length--
            index++
        }
        const prodDetails = await cartQuries.QueryListOfProducts(arr);

        length = prodDetails.length
        index = 0;
        let totalCartValue = 0
        while (length != 0) {

            findCart[index].price = prodDetails[index].Price * findCart[index].quantity
            findCart[index].Discount = prodDetails[index].Discount
            findCart[index].DiscountedPrice = findCart[index].price * (100 - findCart[index].Discount) / 100
            totalCartValue = totalCartValue + findCart[index].DiscountedPrice
            index++
            length--
        }
        length = findCart.length;
        index = 0;
        while (length > 0) {
            await cartQuries.updateCart2(decoded.id, findCart[index].ProductID, findCart[index].price,
                findCart[index].Discount, findCart[index].DiscountedPrice);
            index++;
            length--;
        }

        //  const updateCart = await cartQuries.BulkupdateCart(findCart, { updateOnDuplicate: ["price", "Discount", "DiscountedPrice"] })

        let data = {
            totalCartValue: totalCartValue,
            totalQuantity: totalQuantity,
            Cart: findCart
        }

        return responce.withData(req, res, Code.StatusCodes.NOT_FOUND, data, "Cart Details")


    } catch (error) {
        next(error);
    }
};
module.exports = {
    showCart,
};
