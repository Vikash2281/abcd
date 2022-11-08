const jwt = require('jsonwebtoken');
let Obj = {}

Obj.tokenDecode = (req) => {
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'the-super-strong-secrect');
    return decoded;
}

module.exports = Obj