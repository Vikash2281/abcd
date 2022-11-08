const cartQuries = require('../../services/cartItemService');
const responce = require("../helperCTRL/response");
const tokenDecode = require('../helperCTRL/tokenDecode');
const Code = require("http-status-codes");


const createCartItem = async (req, res, next) => {
    try {
        const decoded = tokenDecode.tokenDecode(req);

        const Product = await cartQuries.findProduct(req);

        if (Product.length == 0) {
            return responce.onlyMsg(req, res, Code.StatusCodes.NOT_FOUND, "No product found")
        }

        const quantity = req.body.quantity ?? 1;
        const checkQuantity = Product[0].Stock - quantity;

        if (checkQuantity < 0) {
            return responce.onlyMsg(req, res, Code.StatusCodes.BAD_REQUEST, "dont have enough quantity")
        }

        const CartItem = await cartQuries.checkProductinCart(req, decoded.id)

        let totalPrice = Product[0].Price * quantity;
        let discountedPrice = ((totalPrice) * (100 - Product[0].Discount)) / 100;

        if (CartItem.length != 0) {

            await cartQuries.QueryUpdateCartItem(
                { quantity: CartItem[0].quantity + req.body.quantity, price: +totalPrice + (+CartItem[0].price), Discount: Product[0].Discount, DiscountedPrice: discountedPrice + (+CartItem[0].DiscountedPrice), MerchantID: Product[0].MerchantID },
                { where: { ProductID: req.body.productId, CustomerID: decoded.id } }
            );
            return responce.onlyMsg(req, res, Code.StatusCodes.CREATED, "item added to cart")
        }
        const info = {
            quantity: req.body.quantity ?? 1,
            price: totalPrice,
            ProductID: req.body.productId,
            CustomerID: decoded.id,
            Discount: Product[0].Discount,
            DiscountedPrice: discountedPrice,
            MerchantID: Product[0].MerchantID
        };

        const a = await cartQuries.QueryCreateCartItem(info);

        return responce.onlyMsg(req, res, Code.StatusCodes.CREATED, "item added to cart")

    } catch (error) {
        next(error);
    }
};

module.exports = { createCartItem }





