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
 // for testing   
exports.createCustomer = async (req, res) => {
  try {
    const { name, email } = req.body;

    const customer = await stripe.customers.create({
      name,
      email,
    });

    return res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    console.error('Error creating customer:', error.message);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// add card info 

exports.addNewCard = async (req, res) => {
  try {
    const {
      customer_id,
      card_Name,
      card_ExpYear,
      card_ExpMonth,
      card_Number,
      card_CVC,
    } = req.body;

    const card_token = await stripe.tokens.create({
      card: {
        name: card_Name,
        number: card_Number,
        exp_year: card_ExpYear,
        exp_month: card_ExpMonth,
        cvc: card_CVC
      }
    });

    const card = await stripe.customers.createSource(customer_id, {
      source: `${card_token.id}`
    });

    return res.status(200).json({ card: card.id });

  } catch (error) {
    console.error('Error adding new card:', error.message);
    return res.status(400).json({ success: false, msg: error.message });
  }
};
// chat gpt //////////////

exports.checkout = async (req, res) => {
  const cart = req.body.cart;
  const lineItems = cart.map(item => ({
      price_data: {
          currency: 'usd',
          product_data: {
              name: item.Name,
              // images: [item.Image.url], // Optional
          },
          unit_amount: item.Price * 100, // Stripe expects amount in cents
      },
      quantity: 1,
  }));

  const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://127.0.0.1:5503/PaymentSuccess.html',
      cancel_url: 'http://127.0.0.1:5503/cart.html',
  });

  res.json({ id: session.id });
};