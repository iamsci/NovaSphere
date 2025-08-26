import express from 'express';
import stripe from '../utils/stripe.js';
import { logger } from '../utils/logger.js';
import bodyParser from 'body-parser';

const router = express.Router();

// Stripe requires raw body for signature verification
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    logger.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  logger.info(`🔔 Stripe event received: ${event.type}`);

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      logger.info(`✅ Payment succeeded for ${paymentIntent.amount} (ID: ${paymentIntent.id})`);
      // TODO: Update DB, notify user, etc.
      break;

    case 'checkout.session.completed':
      const session = event.data.object;
      logger.info(`🛒 Checkout completed for session ${session.id}`);
      // TODO: Fulfill order, update user status, etc.
      break;

    case 'payment_intent.payment_failed':
      const failedIntent = event.data.object;
      logger.warn(`❌ Payment failed: ${failedIntent.last_payment_error?.message}`);
      // TODO: Notify user, retry logic, etc.
      break;

    default:
      logger.warn(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
});

export default router;
