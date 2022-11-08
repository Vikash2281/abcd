const bcrypt = require("bcrypt");
const merchantQuries = require('../../services/merchantService');
const Merchant = require('../../Models/MerchantModel/merchantmodels/merRegModel');
const responce = require("../helperCTRL/response");
const tokenDecode = require('../helperCTRL/tokenDecode');

exports.setPassword = async (req, res, next) => {

  try {

    const decoded = tokenDecode.tokenDecode(req);
    const hashPass = await bcrypt.hash(req.body.setPassword, 12);

    const statusCheck = await merchantQuries.setPassword(req, decoded.id);

    if (statusCheck[0].Status == "Verified") {

      await Merchant.update({ password: hashPass, },
        { where: { id: decoded.id }, }
      );

      return responce.onlyMsg(req, res, 200, "passowrd is set")
    }

    else {
      return responce.onlyMsg(req, res, 401, "Not varified")
    }
  }
  catch (error) {
    next(error);
  }
};
