let nodemailer = require("nodemailer");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const otpTable = require('../../Models/customerModel/otpModule');
const userTable = require('../../Models/customerModel/registerModule');
const Code = require("http-status-codes");

exports.OTP = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {

    const row = await userTable.findAll({
      where: {
        email: [req.body.email]
      }
    });

    if (row.length != 0) {
      return res.status(409).json({
        Status: Code.ReasonPhrases.OK,
        StatusCode: Code.StatusCodes.CONFLICT,
        responce: {
          message: "email already exist"
        }
      });
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vikash.singh@appventurez.com",
        pass: "yfybfxptzrlbkphi",
      },
    });

    let OTP = () => {
      let numbers = "0123456789";
      let OTP = "";
      for (let i = 0; i < 4; i++) {
        OTP += numbers[Math.floor(Math.random() * 10)];
      }
      return OTP;
    };

    const timestamp = Math.floor(Date.now() / 1000)
    const saveOTP = OTP();
    console.log(saveOTP);

    const theToken = jwt.sign(
      { email: req.body.email },
      "the-super-strong-secrect",
      { expiresIn: "1h" }
    );

    let mailOptions = {
      from: "vikash.singh@appventurez.com",
      to: req.body.email,
      subject: "OTP verification",
      text: saveOTP, theToken
    };
    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: ");
    //   }
    // });

    const id = await otpTable.findAll({
      where: {
        email: req.body.email
      }
    });
    ////////////////////////////////////////////////////
    if (id.length == 0) {

      await otpTable.create({ email: req.body.email, OTP: saveOTP, timestamp: timestamp });

    }
    else {
      await otpTable.update({ OTP: saveOTP, timestamp: timestamp }, { where: { email: req.body.email } })

    }
    //////////////////////////////////
    return res.status(200).json({
      Status: Code.ReasonPhrases.OK,
      StatusCode: Code.StatusCodes.OK,
      responce: {
        message: "otp send",
        Token: theToken
      }
    });

  } catch (err) {
    next(err);
  }
}
