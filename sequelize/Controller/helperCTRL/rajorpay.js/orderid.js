const Razorpay = require('razorpay');
var instance = new Razorpay({ key_id: 'rzp_test_LdaoN6dOlvNcbw', key_secret: 'fMpE7YvCU9xhh2T7w3tcyVjO' })

exports.orderId = (req, res) => {
    console.log("Ewfws");
    try {
        var options = {
            amount: 50000,
            currency: "INR",
            receipt: "rcp1"
        };
        instance.orders.create(options, function (err, order) {
            res.send({
                orderId: order.id
            })
        });
    } catch (error) {
        console.log(error);
    }
}