
let Secret_Key = 'sk_test_51LeuBwSDwmeywlhUO882kp7DuXDsOQMZ1rM5iXrBivV5yOeKy1w94OW48II43z7tUWr2XHXr9IAga9kDxrtYkbYs007WbliPIC'
const stripe = require('stripe')(Secret_Key)

exports.test = async (req, res, amount, cusID) => {
    try {


        stripe.customers.create({

            email: req.body.stripeEmail,
            source: req.body.stripeToken,
            name: 'vikash',
            address: {
                line1: 'TC 9/4 Old MES colony',
                postal_code: '110092',
                city: 'New Delhi',
                state: 'Delhi',
                country: 'India',
            }
        })

        let paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: req.body.cardNo,
                exp_month: req.body.expMonth,
                exp_year: req.body.expYear,
                cvc: req.body.cvc,
            },
        });
        console.log(paymentMethod);

        let paymentIntent = await stripe.paymentIntents.create({
            description: 'Shopping',
            payment_method: paymentMethod.id,
            amount: amount,
            currency: "inr",
            confirm: true,
            off_session: true,
            payment_method_types: ['card']
        },
        )
        return paymentIntent;

    } catch (error) {
        console.log(error);
    }
}
