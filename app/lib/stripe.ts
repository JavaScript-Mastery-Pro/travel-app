import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export const createProduct = async (
  tripName: string,
  tripDescription: string,
  tripImages: string[],
  tripPrice: number,
  tripId: string
) => {
  const product = await stripe.products.create({
    name: tripName,
    description: tripDescription,
    images: tripImages,
  });
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: tripPrice * 100,
    currency: "usd",
  });
  const paymentLink = await stripe.paymentLinks.create({
    line_items: [{ price: price.id, quantity: 1 }],
    metadata: {
      tripId,
    },
    after_completion: {
      type: "redirect",
      redirect: {
        url: `${process.env.VITE_BASE_URL}/payment-success`,
      },
    },
  });
  return paymentLink;
};
