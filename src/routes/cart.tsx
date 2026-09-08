import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { money, useCart } from "@/lib/shop";

const title = "Your cart — LUMA";
const description = "Review the iPhones in your LUMA cart and head to checkout in one tap.";

export const Route = createFileRoute("/cart")({
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
  component: CartPage,
});

function CartPage() {
  const { lines, subtotal, setQty, remove } = useCart();

  return (
    <div className="bg-cream text-brand min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-6xl w-full mx-auto px-5 py-14">
        <h1 className="font-display font-semibold text-4xl leading-tight">Your cart</h1>

        {lines.length === 0 ? (
          <div className="mt-8 bg-cream ring-1 ring-black/5 rounded-3xl p-10 text-center">
            <p className="text-brand/60">Nothing in here yet.</p>
            <Link
              to="/"
              hash="shop"
              className="mt-5 inline-flex items-center gap-2 bg-brand text-cream text-sm font-semibold py-2 pr-3 pl-2 rounded-full ring-1 ring-brand/40 hover:opacity-90"
            >
              Browse phones
              <span className="shrink-0 size-4 grid place-items-center text-coral">→</span>
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2 bg-cream ring-1 ring-black/5 rounded-3xl p-6 space-y-5">
              {lines.map(({ product, qty }) => (
                <div key={product.id} className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="size-20 rounded-2xl object-cover ring-1 ring-black/5"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-brand/60">{product.detail}</p>
                    <div className="mt-2 inline-flex items-center gap-3 rounded-full ring-1 ring-black/10 px-3 py-1">
                      <button className="text-brand/60 hover:text-brand" onClick={() => setQty(product.id, qty - 1)}>
                        −
                      </button>
                      <span className="text-sm font-semibold w-4 text-center">{qty}</span>
                      <button className="text-brand/60 hover:text-brand" onClick={() => setQty(product.id, qty + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-semibold">{money(product.price * qty)}</p>
                    <button
                      className="text-xs text-brand/50 hover:text-coral mt-1"
                      onClick={() => remove(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-brand text-cream rounded-3xl p-6">
              <div className="flex justify-between text-sm text-cream/70">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-cream/70 mt-1">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-display font-semibold text-lg mt-3 pt-3 ring-1 ring-cream/15">
                <span>Total</span>
                <span>{money(subtotal)}</span>
              </div>
              <Link
                to="/checkout"
                className="mt-4 block text-center bg-coral text-brand text-sm font-semibold py-2 rounded-full ring-1 ring-coral/40 hover:opacity-90"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
