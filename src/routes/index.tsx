import { createFileRoute, Link } from "@tanstack/react-router";

import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { money, products, useCart } from "@/lib/shop";

const title = "LUMA — Glossy iPhones, small-batch shop";
const description =
  "Shop unlocked iPhones with a one-year warranty, free shipping over $75, and a checkout that takes 60 seconds.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

const ticker = ["FREE SHIPPING OVER $75", "NEW DROP LIVE", "1-YEAR WARRANTY", "UNLOCKED, ALWAYS"];

const reviews = [
  { stars: "★★★★★", text: "Ordered the 16 Pro on Tuesday, had it Thursday. Sealed, unlocked, flawless.", name: "Rhea M." },
  { stars: "★★★★★", text: "The coral one is unreal in person. Packaging alone was worth the hype.", name: "Devon K." },
  { stars: "★★★★☆", text: "Great price on the 15 and they actually answer their emails. Rare combo.", name: "Sana P." },
];

function Index() {
  const { add } = useCart();

  return (
    <div className="bg-cream text-brand min-h-screen">
      <SiteHeader />

      <section className="bg-cream pt-6 pb-14">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-5">
            <span className="inline-block text-[11px] uppercase tracking-[0.2em] font-semibold text-coral mb-4">
              Drop 04 — Live
            </span>
            <h1 className="font-display font-bold text-5xl md:text-6xl leading-none chrome-text max-w-[20ch]">
              Every iPhone, with a little extra.
            </h1>
            <p className="font-body text-base text-brand/70 mt-6 max-w-[40ch] text-pretty">
              Unlocked, checked twice, and shipped in packaging you'll want to keep. No carrier lock-in, no boring grey
              boxes.
            </p>
            <Link
              to="/"
              hash="shop"
              className="mt-8 inline-flex items-center gap-2 bg-brand text-cream text-sm font-semibold py-2 pr-3 pl-2 rounded-full ring-1 ring-brand/40 hover:opacity-90"
            >
              Shop the drop
              <span className="shrink-0 size-4 grid place-items-center text-coral">→</span>
            </Link>
          </div>
          <div className="md:col-span-7 md:translate-y-6">
            <img
              src={heroImg}
              alt="Glossy iPhones on a mirrored chrome tray"
              width={1440}
              height={1080}
              className="w-full aspect-[4/3] object-cover outline-1 -outline-offset-1 outline-black/5 rounded-[min(1vw,12px)]"
            />
          </div>
        </div>
      </section>

      <div className="bg-brand py-3 overflow-hidden">
        <div className="marquee-track flex gap-8 whitespace-nowrap w-max">
          {[...ticker, ...ticker].map((t, i) => (
            <span
              key={i}
              className={`font-display font-semibold text-sm tracking-wide ${
                ["text-cream", "text-mint", "text-coral", "text-gold"][i % 4]
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <section id="shop" className="bg-cream py-16 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display font-semibold text-3xl leading-tight text-brand max-w-[48ch] text-balance">
              In stock now
            </h2>
            <Link to="/cart" className="text-sm font-semibold text-brand/70 hover:text-brand">
              View cart →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <div
                key={p.id}
                className={`lift bg-cream ring-1 ring-black/5 rounded-2xl overflow-hidden ${
                  i === 1 ? "md:translate-y-8" : ""
                }`}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full aspect-square object-cover outline-1 -outline-offset-1 outline-black/5"
                />
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <h3 className="font-body font-semibold text-brand">{p.name}</h3>
                    <span className="font-display font-semibold text-brand">{money(p.price)}</span>
                  </div>
                  <p className="text-sm text-brand/60 mt-1">{p.detail}</p>
                  <button
                    onClick={() => add(p)}
                    className="mt-4 w-full bg-brand text-cream text-sm font-semibold py-2 pr-3 pl-2 rounded-full ring-1 ring-brand/40 hover:opacity-90"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-brand text-cream py-16 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block text-[11px] uppercase tracking-[0.2em] font-semibold text-mint mb-4">
              The shop
            </span>
            <h2 className="font-display font-semibold text-4xl leading-tight max-w-[40ch] text-balance">
              A tiny shop, obsessed with the glossy.
            </h2>
            <p className="font-body text-base text-cream/70 mt-6 max-w-[46ch] text-pretty">
              LUMA started as a two-person counter fixing screens after hours. Now we source, test, and hand-pack every
              iPhone we sell — small runs, honest prices, and a healthy fear of boring.
            </p>
          </div>
          <img
            src={aboutImg}
            alt="The LUMA team at their shop counter with phones laid out"
            loading="lazy"
            width={1024}
            height={1024}
            className="w-full aspect-square object-cover outline-1 -outline-offset-1 outline-black/5 rounded-[min(1vw,12px)]"
          />
        </div>
      </section>

      <section id="reviews" className="bg-cream py-16 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="font-display font-semibold text-3xl leading-tight text-brand max-w-[48ch] text-balance mb-8">
            What people say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="bg-cream ring-1 ring-black/5 rounded-2xl p-6">
                <div className="text-gold font-display tracking-tight text-sm">{r.stars}</div>
                <p className="font-body text-base text-brand/80 mt-3 text-pretty">{r.text}</p>
                <p className="text-sm font-semibold text-brand mt-4">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-cream pb-16 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="bg-brand text-cream rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display font-semibold text-3xl leading-tight max-w-[40ch] text-balance">Say hi</h2>
              <p className="font-body text-base text-cream/70 mt-4 max-w-[40ch] text-pretty">
                Questions about an order, a trade-in, or which model to pick? We reply fast.
              </p>
              <p className="mt-6 text-sm font-semibold text-mint">hello@luma.store</p>
              <p className="text-sm text-cream/60 mt-1">Mon–Fri, 9–5 PT</p>
            </div>
            <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
              <input
                className="bg-cream/10 text-cream placeholder:text-cream/40 rounded-full px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mint"
                placeholder="Your name"
              />
              <input
                className="bg-cream/10 text-cream placeholder:text-cream/40 rounded-full px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mint"
                placeholder="you@email.com"
              />
              <textarea
                className="bg-cream/10 text-cream placeholder:text-cream/40 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mint"
                rows={3}
                placeholder="What's up?"
              />
              <button className="bg-coral text-brand text-sm font-semibold py-2 pr-3 pl-2 rounded-full ring-1 ring-coral/40 hover:opacity-90">
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
