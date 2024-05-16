const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.payments = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.wallet,
      currency: "pkr",
      metadata: {
        company: "MexilSoftware",
      },
    });
    return res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating payment intent." });
  }
};
