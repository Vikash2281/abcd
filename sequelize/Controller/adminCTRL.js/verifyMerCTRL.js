const nodemailer = require("nodemailer");
const adminQueries = require("../../services/adminService")
const responce = require("../helperCTRL/response");
const tokenDecode = require('../helperCTRL/tokenDecode');

exports.verifyMerchant = async (req, res, next) => {

    try {

        const decoded = tokenDecode.tokenDecode(req);

        if (decoded.userType != "admin") {

            return responce.onlyMsg(req, res, 401, "Dont have authority")
        }

        const row = await adminQueries.getMerchant(req);

        if (row.length == 0) {

            return responce.onlyMsg(req, res, 404, "No merchant found")
        }

        let a = await adminQueries.merchantAuth(req, "Verified");


        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "vikash.singh@appventurez.com",
                pass: "yfybfxptzrlbkphi",
            },
        });

        const passToken = jwt.sign(
            { id: row[0].id, userStatus: row[0].Status, }, "the-super-strong-secret", { expiresIn: "1h" }
        );


        let mailOptions = {
            from: "vikash.singh@appventurez.com",
            to: row.email,
            subject: "Verification",
            text: passToken,
        };

        transporter.sendMail(mailOptions, function (error, info) {

            // if (error) {
            //     console.log(error);
            // } else {

            //     return res.status(201).json({
            //         message: "you can set password",
            //         Token: passToken
            //     });
            // }
            return res.status(201).json({
                Status: Code.ReasonPhrases.OK,
                StatusCode: Code.StatusCodes.ACCEPTED,
                responce: {
                    message: "you can set password",
                    Token: passToken
                }
            });
        });
    } catch (error) {
        next(error);
    }
};
