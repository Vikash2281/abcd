// const cartQuries = require('../../services/cartItemService');
// const tokenVarification = require("../../tokenVarification");
// const jwt = require("jsonwebtoken");
// const Code = require("http-status-codes");


// const createCartItem2 = async (req, res, next) => {

//     try {
//         tokenVarification(req, res);

//         const theToken = req.headers.authorization.split(" ")[1];
//         const decoded = jwt.verify(theToken, "the-super-strong-secrect");

//         const Product = await cartQuries.findProduct(req);

//         if (Product.length == 0) {
//             return res.json({
//                 Status: Code.ReasonPhrases.OK,
//                 StatusCode: Code.StatusCodes.NOT_FOUND,
//                 responce: {
//                     message: "no product found",
//                 }
//             });
//         }

//         const quantity = req.body.quantity ?? 1;
//         const checkQuantity = Product[0].Stock - quantity;

//         if (checkQuantity < 0) {
//             return res.json({
//                 Status: Code.ReasonPhrases.OK,
//                 StatusCode: Code.StatusCodes.NOT_ACCEPTABLE,
//                 responce: {
//                     message: "not enough quantity in stock",
//                     Available_Quantity: Product[0].Stock
//                 }
//             });
//         }

//         const CartItem = await cartQuries.checkProductinCart(req)


//         if (CartItem.length != 0) {

//             await cartQuries.QueryUpdateCartItem(
//                 { quantity: CartItem[0].quantity + req.body.quantity, MerchantID: Product[0].MerchantID },
//                 { where: { ProductID: req.body.productId } }
//             );
//             return res.json({
//                 Status: Code.ReasonPhrases.OK,
//                 StatusCode: Code.StatusCodes.CREATED,
//                 responce: {
//                     message: "Item added to cart",
//                 }
//             });
//         }
//         const info = {
//             quantity: req.body.quantity ?? 1,
//             ProductID: req.body.productId,
//             CustomerID: decoded.id,
//             price: Product[0].price,
//             Discont: Product[0].Discont,
//             discontedPrice:
//             MerchantID: Product[0].MerchantID
//         };

//         await cartQuries.QueryCreateCartItem(info);

//         return res.json({
//             Status: Code.ReasonPhrases.OK,
//             StatusCode: Code.StatusCodes.CREATED,
//             responce: {
//                 message: "Item added to cart",
//             }
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// module.exports = { createCartItem2 }





