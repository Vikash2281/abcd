const { validationResult } = require('express-validator');

let tokenVarification = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(422).json({ errors: errors.array() });
  }

  try {

    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer') ||
      !req.headers.authorization.split(' ')[1]
    ) {
      return res.status(422).json({
        message: "Please provide the token",
      });
    }
    else {
      next();
    }

  }
  catch (err) {
    next(err);
  }
}
module.exports = tokenVarification;



