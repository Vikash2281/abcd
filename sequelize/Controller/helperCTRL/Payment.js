var Secret_Key = 'sk_test_51LeuBwSDwmeywlhUO882kp7DuXDsOQMZ1rM5iXrBivV5yOeKy1w94OW48II43z7tUWr2XHXr9IAga9kDxrtYkbYs007WbliPIC'
const stripe = require('stripe')(Secret_Key);

exports.payment = (req, res, next) => {
    console.log(req.body.stripeToken);
    stripe.customers.create({
        //  email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'vikash',
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '110092',
            city: 'New Delhi',
            state: 'Delhi',
            country: 'India',
        }
    }).then((customers) => {
        //  console.log(customers.source);
        return stripe.paymentIntents.create({
            amount: 7000,
            description: 'Web Development Product',
            currency: 'inr',
            confirm: true,
            off_session: true,
            payment_method: 'pm_card_visa'
        });
    })
        .then((paymentIntents) => {
            console.log(paymentIntents);
            res.send("Success")
        })
        .catch((err) => {
            console.log("c");

            res.send(err)
        });
}