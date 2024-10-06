import { initStripe } from './utils';

const stripe = initStripe();

export const changeSubscription = async (customerId: string, newTier: string) => {
  try {
    console.log('Attempting to change subscription for customer ID:', customerId);

    // Fetch the customer's current subscription
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      throw new Error('No active subscription found');
    }

    const subscription = subscriptions.data[0];

    // Update the subscription with the new tier
    const updatedSubscription = await stripe.subscriptions.update(subscription.id, {
      items: [{
        id: subscription.items.data[0].id,
        price: newTier, // Assuming newTier is the price ID
      }],
    });

    return updatedSubscription;
  } catch (error) {
    console.error('Error changing subscription:', error);
    throw error;
  }
};
