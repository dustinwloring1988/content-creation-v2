import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { initStripe } from '@/lib/utils';

const stripe = initStripe();

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSession = event.data.object as Stripe.Checkout.Session;
      // Handle successful checkout
      // You might want to update user's subscription status, send a welcome email, etc.
      console.log('Checkout completed:', checkoutSession.id);
      break;
    case 'invoice.paid':
      const invoice = event.data.object as Stripe.Invoice;
      // Handle successful payment
      // You might want to extend the user's subscription, update usage limits, etc.
      console.log('Invoice paid:', invoice.id);
      break;
    case 'invoice.payment_failed':
      const failedInvoice = event.data.object as Stripe.Invoice;
      // Handle failed payment
      // You might want to notify the user, restrict access, etc.
      console.log('Invoice payment failed:', failedInvoice.id);
      break;
    case 'customer.subscription.deleted':
      const subscription = event.data.object as Stripe.Subscription;
      // Handle subscription cancellation
      // You might want to update user's status, remove access, etc.
      console.log('Subscription deleted:', subscription.id);
      break;
    // Add more event types as needed
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}