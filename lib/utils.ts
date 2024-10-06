import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Stripe from 'stripe';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function initStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-09-30.acacia',
  });
}
