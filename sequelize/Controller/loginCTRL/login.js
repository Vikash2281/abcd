const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const adminQuries = require('../../services/adminService');
const merchantQuries = require('../../services/merchantService');
const customerQuries = require('../../services/customerService');
const Code = require("http-status-codes");
const jwt = require('jsonwebtoken');
const responce = require("../helperCTRL/response");



exports.adminlogin = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {

        const row = await adminQuries.checkDetails(req)

        generateToken(req, res, row, "admin", next)

    } catch (err) {
        next(err);
    }
};
/////////////////////////////////////////////////////////////////////////////
exports.merchantLogin = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {

        const row = await merchantQuries.checkDetails(req);

        if (row.length == 0) {
            return responce.onlyMsg(req, res, Code.StatusCodes.BAD_REQUEST, "Invalid details")
        }

        // //////////check user is blocked or not/////////////
        if (row[0].Status == "Blocked") {
            return responce.onlyMsg(req, res, Code.StatusCodes.BAD_REQUEST, "You are blocked")
        }
        /////////////token generate///////////////////////
        generateToken(req, res, row, "merchant", next)

    } catch (err) {
        next(err);
    }
};

/////////////////////////////////////////////////////////////////////////////
exports.customerLogin = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {

        const row = await customerQuries.checkDetails(req)

        if (row.length == 0) {
            return responce.onlyMsg(req, res, Code.StatusCodes.BAD_REQUEST, "Invalid details")
        }

        // //////////check user is blocked or not/////////////
        if (row[0].Status == "Blocked") {
            return responce.onlyMsg(req, res, Code.StatusCodes.BAD_REQUEST, "You are blocked")
        }
        /////////////token generate///////////////////////
        generateToken(req, res, row, "customer", next)

    } catch (err) {
        next(err);
    }
};

////////////////////////////////////////////////////////////////////////////
const generateToken = async (req, res, row, usertype, next) => {

    try {

        const passMatch = await bcrypt.compare(req.body.password, row[0].password);

        if (row.length != 0 && passMatch == true) {
            const theToken = jwt.sign(
                { userType: usertype, id: row[0].id },
                "the-super-strong-secrect",
                { expiresIn: "5h" }
            );

            return responce.withData(req, res, Code.StatusCodes.OK, theToken, "Details")


        }
        else {
            return responce.onlyMsg(req, res, Code.StatusCodes.BAD_REQUEST, "Invalid details")
        }
    } catch (err) {
        next(err);
    }
}
