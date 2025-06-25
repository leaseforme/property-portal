import { useRouter } from 'next/router';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe.js using the publishable key set in the environment
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutFormProps {
  unitId: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ unitId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Create a PaymentIntent for the application fee via our API
      const piRes = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unitId }),
      });

      if (!piRes.ok) throw new Error('Unable to create payment intent');

      const { clientSecret } = await piRes.json();

      // 2. Confirm card payment using the client secret
      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement! },
      });

      if (result.error) {
        setError(result.error.message || 'Payment failed');
        setLoading(false);
        return;
      }

      // 3. Redirect to dashboard (application is auto‑created server‑side)
      router.push('/portal');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <CardElement className="p-4 border rounded" />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Processing…' : 'Pay application fee'}
      </button>
    </form>
  );
};

const ApplyPage: React.FC = () => {
  const router = useRouter();
  const { unitId } = router.query;

  // Ensure we have a single unitId string before rendering
  if (!unitId || Array.isArray(unitId)) return null;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm unitId={unitId} />
    </Elements>
  );
};

export default ApplyPage;
