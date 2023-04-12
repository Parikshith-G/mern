const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const stripe_secret_key =
  "sk_test_51MXlw1SEw4ujCMFEJhogzufOuWZWKVykMX1bi7vQ6uxkGeK0aT0lEM3tMCJHJk7x59bXGWaIZ93avS2Z2faKxrLd00y2HbDVAo";
const stripe_api_key =
  "pk_test_51MXlw1SEw4ujCMFEiGnuXiFCgc86isIKoR0pybHQ6Mc9EnSxY3r9Cqz709htmBSLWLLcmBV6dvXATEOOWDmAA2Br00DAt3pMlo";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process stripe payments   =>   /api/v1/payment/process

// stripe_secret_key
// stripe_api_key

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",

    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
