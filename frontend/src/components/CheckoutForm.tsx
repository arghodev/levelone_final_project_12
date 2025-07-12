import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "../hooks/useCart";
import type { CartItem } from "../types/propsTypes";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const CheckoutForm = () => {
  const [error, setError] = useState<string | null>(""); // ✅ handles card error
  const [message, setMessage] = useState<string | null>(""); // ✅ payment success/failure message
  const [isLoading, setIsLoading] = useState(false); // ✅ camelCase fix
  const [clientSecret, setClientSecret] = useState(""); // ✅ stores Stripe secret key
  const [success, setSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: cart = [], refetch } = useCart();
  const navigate = useNavigate();

  // ✅ total cart price
  const totalPrice = cart.reduce(
    (sum: number, item: CartItem) => sum + Number(item.price),
    0
  );

  // ✅ fetch payment intent client secret
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch((err) => console.error("Error fetching clientSecret:", err));
    }
  }, [axiosSecure, totalPrice]);

  // ✅ handle payment form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    setError(null);
    setMessage(null);

    const card = elements.getElement(CardElement); // ✅ get Stripe card input
    if (!card) return;

    // ✅ create payment method
    const { error: methodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      setError(methodError.message || "Card information is incorrect.");
      setIsLoading(false);
      return;
    }

    // ✅ confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "anonymous@example.com",
          },
        },
      });
    console.log(paymentIntent, transactionId);

    if (confirmError) {
      setMessage(confirmError.message || "Payment failed.");
    } else if (paymentIntent?.status === "succeeded") {
      setMessage("🎉 Payment successful!");
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        setClientSecret("");
        setSuccess(true);

        const payment = {
          email: user?.email,
          transactionId: paymentIntent.id,
          price: totalPrice,
          date: new Date(),
          cartIds: cart.map((item: CartItem) => item._id),
          menuIds: cart.map((item: CartItem) => item.menuid),
          status: "pending",
        };

        await axiosSecure
          .post("/payments", payment)
          .then((res) => {
            toast.success("Payment saved successfully");
            console.log("payment saved ==> ", res.data);
            refetch();
            navigate("/dashboard/paymentHistory");
          })
          .catch((err) => console.error("Error saving payment:", err));

        //TODO: we can clear the my cart and rediecrt to order page
        // console.log(paymentIntent.id);
      }
    } else {
      setMessage("❌ Payment not completed.");
    }

    setIsLoading(false);
  };

  return (
    <section className="max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        {/* ✅ Stripe Card Element */}
        <CardElement
          aria-label="Card Element"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />

        {/* ✅ Error message from card input */}
        {error && <p className="text-red-600 mt-2">{error}</p>}

        {/* ✅ Message after confirmation */}
        {message && <p className="text-green-600 mt-2">{message}</p>}

        {/* ✅ Submit button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={!stripe || !clientSecret || isLoading || success}
            className={`btn btn-wide mt-5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 `}
          >
            {isLoading ? "Processing..." : "Pay"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CheckoutForm;
