var bodyParser = require("body-parser");
const router = require("express").Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Joi = require("joi");

let Velidation = {};

Velidation.customerRegistration = (req, res, next) => {
    const schema = Joi.object().keys({
        name: Parameter.OnlyAlphabet,
        email: Parameter.email,
        phone: Parameter.phone,
        password: Parameter.Number_Alphabet,
        // repeat_password: Joi.ref("password"),
    }).unknown(false);
    errorHandler(schema, next, req, res);
}

Velidation.loginVelidation = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Parameter.email,
        password: Parameter.Alphanum,
    }).unknown(false);
    errorHandler(schema, next, req, res)
}

Velidation.customerAddress = (req, res, next) => {
    const schema = Joi.object().keys({
        address: Parameter.OnlyAlphabet,
    }).unknown(false);
    errorHandler(schema, next, req, res);
}

Velidation.customerCreatecart = (req, res, next) => {
    const schema = Joi.object().keys({
        quantity: Parameter.Quantity,
    }).unknown(true);
    errorHandler(schema, next, req, res);
}

Velidation.sendOTP = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Parameter.Alphanum,
    }).unknown(false);
    errorHandler(schema, next, req, res);
}

Velidation.verifyOTP = (req, res, next) => {
    const schema = Joi.object().keys({
        OTP: Parameter.otp,
    }).unknown(false);
    errorHandler(schema, next, req, res);
}

Velidation.merchantRegistration = (req, res, next) => {
    const schema = Joi.object().keys({
        name: Parameter.OnlyAlphabet,
        email: Parameter.email,
        phone: Parameter.phone,
        CompanyName: Parameter.Alphanum,
    }).unknown(false);
    errorHandler(schema, next, req, res);
}

Velidation.merchantSetPassword = (req, res, next) => {
    const schema = Joi.object().keys({
        password: Parameter.Alphanum,
    }).unknown(false);
    errorHandler(schema, next, req, res);
}

Velidation.merchantAddCategory = (req, res, next) => {
    const schema = Joi.object().keys({
        category: Parameter.Alphanum,
        subCategory: Parameter.Alphanum,
    }).unknown(false);
    errorHandler(schema, next, req, res);
}

Velidation.merchantAddProduct = (req, res, next) => {
    const schema = Joi.object().keys({
        name: Parameter.Alphanum,
        price: Parameter.price,
        des: Parameter.OnlyAlphabet,
        stock: Parameter.price,
        discount: Parameter.Discount
    }).unknown(false);
    errorHandler(schema, next, req, res);
}

Velidation.merchantUpdateProduct = (req, res, next) => {
    const schema = Joi.object().keys({
        price: Parameter.price,
        quantity: Parameter.price,
        discount: Parameter.Discount
    }).unknown(true);
    errorHandler(schema, next, req, res);
}

let Parameter = {
    OnlyAlphabet: Joi.string().min(2).max(30).required().pattern(new RegExp("^[a-zA-Z]*$")),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    otp: Joi.string().length(4).pattern(/^[0-9]+$/).required(),
    price: Joi.number().min(1).max(10000).required(),
    Alphanum: Joi.string().alphanum().required(),
    Discount: Joi.number().min(0).max(100).required(),
    Quantity: Joi.number().required(),
}


function errorHandler(schema, next, req, res) {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        res.status(200).json(error.message);
    } else {
        next();
    }
}

module.exports = Velidation;

