import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { money, useCart } from "@/lib/shop";

const title = "Checkout — LUMA";
const description = "Enter shipping and payment details to complete your LUMA iPhone order.";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

const field =
  "bg-cream/10 text-cream placeholder:text-cream/40 rounded-full px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mint w-full";

function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <div className="bg-cream text-brand min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 max-w-6xl w-full mx-auto px-5 py-24 text-center">
          <h1 className="font-display font-semibold text-4xl chrome-text">Order placed</h1>
          <p className="mt-4 text-brand/70">
            A confirmation is on its way. We hand-pack every order, so it ships within one business day.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 bg-brand text-cream text-sm font-semibold py-2 pr-3 pl-2 rounded-full ring-1 ring-brand/40 hover:opacity-90"
          >
            Back to the shop
            <span className="shrink-0 size-4 grid place-items-center text-coral">→</span>
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="bg-cream text-brand min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-6xl w-full mx-auto px-5 py-14">
        <h1 className="font-display font-semibold text-4xl leading-tight">Checkout</h1>

        <div className="mt-8 grid md:grid-cols-3 gap-6 items-start">
          <form
            className="md:col-span-2 bg-brand text-cream rounded-3xl p-8 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              clear();
              setPlaced(true);
            }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input required className={field} placeholder="Full name" />
              <input required type="email" className={field} placeholder="you@email.com" />
            </div>
            <input required className={field} placeholder="Shipping address" />
            <div className="grid sm:grid-cols-3 gap-4">
              <input required className={field} placeholder="City" />
              <input required className={field} placeholder="ZIP" />
              <input required className={field} placeholder="Country" />
            </div>
            <input required className={field} placeholder="Card number" inputMode="numeric" />
            <div className="grid sm:grid-cols-2 gap-4">
              <input required className={field} placeholder="MM / YY" />
              <input required className={field} placeholder="CVC" inputMode="numeric" />
            </div>
            <button
              disabled={lines.length === 0}
              className="mt-2 bg-coral text-brand text-sm font-semibold py-3 rounded-full ring-1 ring-coral/40 hover:opacity-90 disabled:opacity-40"
            >
              Place order · {money(subtotal)}
            </button>
          </form>

          <div className="bg-cream ring-1 ring-black/5 rounded-3xl p-6">
            <h2 className="font-display font-semibold text-xl">Order summary</h2>
            <div className="mt-4 space-y-3">
              {lines.length === 0 && <p className="text-sm text-brand/60">Your cart is empty.</p>}
              {lines.map(({ product, qty }) => (
                <div key={product.id} className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {product.name} <span className="text-brand/50">× {qty}</span>
                  </span>
                  <span className="font-semibold">{money(product.price * qty)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 ring-1 ring-black/5 flex justify-between font-display font-semibold">
              <span>Total</span>
              <span>{money(subtotal)}</span>
            </div>
            <Link to="/cart" className="mt-4 block text-center text-sm font-semibold text-brand/60 hover:text-brand">
              Edit cart
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
