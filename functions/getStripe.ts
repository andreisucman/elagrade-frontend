import { loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<any> | null = null;

export default function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
  }
  return stripePromise;
}
