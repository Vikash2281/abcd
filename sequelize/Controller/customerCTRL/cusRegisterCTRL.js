const bcrypt = require('bcrypt');
const tokenVarification = require('../helperCTRL/tokenVarification');
const jwt = require('jsonwebtoken');
const Queries = require('../../services/customerService');
const Code = require("http-status-codes");

exports.register = async (req, res, next) => {

    try {

        tokenVarification(req, res);

        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

        if (req.body.email == decoded.email && decoded.status == 'T') {

            const hashPass = await bcrypt.hash(req.body.password, 12);

            const row = await Queries.findPhNO(req)

            if (row.length != 0) {
                return res.status(409).json({
                    Status: Code.ReasonPhrases.OK,
                    StatusCode: Code.StatusCodes.CONFLICT,
                    responce: {
                        message: "phone no already exists",
                    }
                });
            }

            await Queries.createCustomer(req, hashPass);

            return responce.onlyMsg(req, res, Code.StatusCodes.CREATED, "registred")

        }
        else {
            return res.status(400).json({
                Status: Code.ReasonPhrases.OK,
                StatusCode: Code.StatusCodes.BAD_REQUEST,
                responce: {
                    message: "invalid details",
                }
            });
        }

    } catch (err) {
        next(err);
    }
}