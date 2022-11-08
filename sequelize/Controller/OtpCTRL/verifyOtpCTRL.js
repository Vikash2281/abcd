const jwt = require('jsonwebtoken');
const tokenVarification = require('../helperCTRL/tokenVarification')
const otpTable = require('../../Models/customerModel/otpModule')
const Code = require("http-status-codes");

exports.verifyOTP = async (req, res, next) => {

    try {

        tokenVarification(req, res);

        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

        const timestamp_verify = Math.floor(Date.now() / 1000);

        const row = await otpTable.findAll({
            where: {
                email: decoded.email
            }
        });
        console.log(row[0].timestamp);
        if (timestamp_verify - row[0].timestamp > 60) {
            return res.json({
                Status: Code.ReasonPhrases.OK,
                StatusCode: Code.StatusCodes.UNAUTHORIZED,
                responce: {
                    message: "OTP Expired! Please try again"
                }
            })

        }

        if (row[0].OTP == req.body.OTP) {

            const theToken = jwt.sign(
                { email: decoded.email, status: 'T' },
                "the-super-strong-secrect",
                { expiresIn: "1h" }
            );
            return res.status(201).json({
                Status: Code.ReasonPhrases.OK,
                StatusCode: Code.StatusCodes.OK,
                responce: {
                    message: "verify",
                    Token: theToken
                }
            });
        }
        else {
            return res.status(409).json({
                message: "OTP is not correct"
            });
        }

    } catch (err) {
        next(err);
    }
}


