import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export const createProduct = async (
  name: string,
  description: string,
  images: string[],
  price: number,
  tripId: string
) => {
  const product = await stripe.products.create({
    name: name,
    description: description,
    images: images,
  });
  const priceObject = await stripe.prices.create({
    product: product.id,
    unit_amount: price * 100,
    currency: "usd",
  });
  const paymentLink = await stripe.paymentLinks.create({
    line_items: [{ price: priceObject.id, quantity: 1 }],
    metadata: {
      tripId,
    },
    after_completion: {
      type: "redirect",
      redirect: {
        url: `${process.env.VITE_BASE_URL}/travel/${tripId}/success`,
      },
    },
  });
  return paymentLink;
};
