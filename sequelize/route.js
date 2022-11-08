const router = require("express").Router();
const { register } = require("./Controller/customerCTRL/cusRegisterCTRL");
const { address } = require("./Controller/customerCTRL/cusAddressCTRL");
const { OTP } = require("./Controller/OtpCTRL/generateOtpCTRL");
const { verifyOTP } = require("./Controller/OtpCTRL/verifyOtpCTRL");
const { merRegister } = require("./Controller/merchantCTRL/merRegCTRL");
const { getUserDetails } = require("./Controller/adminCTRL.js/getAllUserDetailsCTRL");
const { verifyMerchant } = require("./Controller/adminCTRL.js/verifyMerCTRL");
const { setPassword } = require("./Controller/merchantCTRL/setPasswortCTRL");
const { addProduct } = require("./Controller/merchantCTRL/addProduct");
const { addCategories } = require("./Controller/merchantCTRL/addCategories");
const { merchantLogin } = require("./Controller/loginCTRL/login");
const { customerLogin } = require("./Controller/loginCTRL/login");
const { searchProduct } = require("./Controller/product/searchProduct");
const { placeOrder3 } = require("./Controller/customerCTRL/placeOrder3");
const { blockUser } = require("./Controller/adminCTRL.js/blockCRTL");
const { getOrderDetails } = require("./Controller/customerCTRL/orderDetailCTRL");
const { showCategories } = require("./Controller/merchantCTRL/showCategoriesCTRL");
const { showProduct } = require("./Controller/product/showProduct");
const { adminlogin } = require("./Controller/loginCTRL/login");
const { createCartItem } = require("./Controller/CartCTRL/addToCartCTRL");
const { showCart } = require("./Controller/CartCTRL/showCart");
const { oneMerProduct } = require("./Controller/product/oneMerProduct");
const { deleteCart } = require("./Controller/CartCTRL/deleteCart");
const { updateProduct } = require("./Controller/merchantCTRL/updateProductCTRL");
const { deleteProduct } = require("./Controller/merchantCTRL/deleteProduct");
const validationResult = require("./Controller/helperCTRL/Authentication");
const { payment } = require("./Controller/helperCTRL/Payment");
const { test } = require("./Controller/helperCTRL/test");
const tokenVarification = require("./Controller/helperCTRL/tokenVarification");
const { paypalpay, paySuccess } = require("./paypal");
const { orderId } = require("./Controller/helperCTRL/rajorpay.js/orderid");
const { verifySig } = require("./Controller/helperCTRL/rajorpay.js/verifySig");

router.post("/OTP", validationResult.sendOTP, OTP);

router.post("/verifyOTP", validationResult.verifyOTP, verifyOTP);

router.post(
  "/customerRegister", validationResult.customerRegistration, register
);

router.post(
  "/customerLogin", validationResult.loginVelidation, customerLogin
);

router.post(
  "/address", tokenVarification, validationResult.customerAddress, address
);

router.get("/showProduct", showProduct);

router.post(
  "/createCartItems", tokenVarification, validationResult.customerCreatecart, createCartItem
);

router.get("/showCart", tokenVarification, showCart);

router.post("/deleteCart", tokenVarification, deleteCart);

router.post(
  "/placeOrder3", tokenVarification, placeOrder3
);


router.post(
  "/merRegister", validationResult.merchantRegistration, merRegister
);

router.post("/setPassword", validationResult.merchantSetPassword, tokenVarification, setPassword);

router.post(
  "/merchantLogin", validationResult.loginVelidation, merchantLogin
);

router.post(
  "/addCategories", tokenVarification, validationResult.merchantAddCategory, addCategories
);

router.get("/showCategories", tokenVarification, showCategories);

router.post(
  "/addProduct", tokenVarification, validationResult.merchantAddProduct, addProduct
);

router.get("/oneMerProduct", oneMerProduct);

router.post("/updateProduct", tokenVarification, validationResult.merchantUpdateProduct, updateProduct);

router.post("/deleteProduct", tokenVarification, deleteProduct);

router.post(
  "/adminlogin", validationResult.loginVelidation, adminlogin
);

router.get("/getUserDetails", tokenVarification, getUserDetails);

router.patch("/verifyMerchant", tokenVarification, verifyMerchant);

router.post(
  "/searchProduct",
  // [body("name", "please enter name").notEmpty().escape().trim(),
  // body("price", "please enter price").notEmpty().escape().trim().isNumeric(),
  // body("des", "please enter Des").notEmpty().escape().trim(),
  // body("stock", "please enter Stock").notEmpty().escape().trim().isNumeric()],
  searchProduct
);

router.patch("/blockUser", tokenVarification, blockUser);

router.get("/getOrderDetails", tokenVarification, getOrderDetails);

router.post("/payment", payment);

router.get("/test", test);

router.get("/paypalPay", paypalpay);

router.get("/paySuccess", paySuccess);

router.get("/cancel", (res) => {
  res.send("cancled")
});

router.get('/', (req, res) => {
  res.sendFile("/home/user/Desktop/sequelize/standred.html");
})

router.post('/create/orderId', orderId)
router.post("/api/payment/verify", verifySig)




module.exports = router;
