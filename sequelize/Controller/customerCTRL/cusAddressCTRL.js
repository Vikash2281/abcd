const Code = require("http-status-codes");
const jwt = require('jsonwebtoken');
const tokenVarification = require('../helperCTRL/tokenVarification');
const Users = require('../../Models/customerModel/registerModule');
const customerQueries = require('../../services/customerService');

exports.address = async (req, res, next) => {

  try {

    tokenVarification(req, res);

    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

    const row = await Users.findAll({
      where: {
        id: decoded.id
      }
    });


    await customerQueries.createAddress(req, decoded.id);
    await customerQueries.updateStepValue(req, decoded.id);

    const data = await customerQueries.findDetails(decoded.id)

    return res.status(201).json({
      Status: Code.ReasonPhrases.OK,
      StatusCode: Code.StatusCodes.CREATED,
      responce: {
        message: data
      }
    });

  } catch (err) {
    next(err);
  }
}