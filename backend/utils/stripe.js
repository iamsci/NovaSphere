import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16'
});

export const createCheckoutSession = async ({ lineItems, successUrl, cancelUrl }) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl
    });
    return session.url;
  } catch (err) {
    console.error('❌ Stripe session error:', err);
    throw err;
  }
};
