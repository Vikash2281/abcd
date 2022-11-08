const productQuery = require("../../services/productService");
const Code = require("http-status-codes");

const showProduct = async (req, res, next) => {
    try {

        const rows = await productQuery.getProducts(req);
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

    } catch (error) {
        next(error);
    }
};
module.exports = {
    showProduct,
};