const paypal = require("paypal-rest-sdk");
paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id:
        "Ae_07ugMoJVB7J9djwdDUdHeo-3I4l0vi2E_VU19HbnU4aRL8qIQBVhuC604QFHrEvRlOjc0cNUTwALu",
    client_secret:
        "ECFTe8mAwiy1wuE52F7i-xLXqBlEwOWaNaJRsLSZ0BmbeY_-SfYjEGIYRMQteCDk304Lcl5RoL-3z7Zl",
});
const paypalpay = async (req, res, next) => {
    try {
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/paySuccess",
                "cancel_url": "http://localhost:3000/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Red Sox Hat",
                        "sku": "001",
                        "price": "25.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "25.00"
                },
                "description": "Hat for the best team ever"
            }]
        };
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {

                        res.json(payment.links[i].href);
                    }
                }
            }
        });

    } catch (error) {
        next(error);
    }
};
const paySuccess = async (req, res, next) => {
    try {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "25.00"
                }
            }]
        };
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                res.send('Success');
            }
        });
    } catch (err) {
        next(err)
    }
}
module.exports = {
    paypalpay,
    paySuccess
}