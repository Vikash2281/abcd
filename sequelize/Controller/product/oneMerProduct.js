const jwt = require("jsonwebtoken");
const productQuery = require("../../services/productService");
const tokenVarification = require("../helperCTRL/tokenVarification");
const Code = require("http-status-codes");

const oneMerProduct = async (req, res, next) => {
    try {

        tokenVarification(req, res);
        const theToken = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(theToken, "the-super-strong-secrect");

        if (decoded.userType == "merchant") {

            const rows = await productQuery.findOneMerchnatProduct(decoded.id, req)
            console.log(rows);
            if (rows.length == 0) {
                return res.json({
                    Status: Code.ReasonPhrases.OK,
                    StatusCode: Code.StatusCodes.NOT_FOUND,
                    responce: {
                        message: "no product found",
                    }
                });
            }
            return res.json({
                Status: Code.ReasonPhrases.OK,
                StatusCode: Code.StatusCodes.OK,
                responce: {
                    products: rows,
                }
            });
        }
        else if (decoded.userType == "admin" || decoded.userType == "customer") {

            const rows = await productQuery.findOneMerchnatProduct(req.body.id)
            if (roww.length == 0) {
                return res.json({
                    Status: Code.ReasonPhrases.OK,
                    StatusCode: Code.StatusCodes.NOT_FOUND,
                    responce: {
                        message: "no product found",
                    }
                });
            }
            return res.json({
                Status: Code.ReasonPhrases.OK,
                StatusCode: Code.StatusCodes.OK,
                responce: {
                    Product: rows[0].dataValues,
                }
            });
        }
        else {
            return res.status(401).json({
                Status: Code.ReasonPhrases.OK,
                StatusCode: Code.StatusCodes.BAD_REQUEST,
                responce: {
                    message: "bad request",
                }
            });
        }
    } catch (error) {
        next(error);
    }
};
module.exports = {
    oneMerProduct,
};