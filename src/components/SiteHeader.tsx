import { Link } from "@tanstack/react-router";

import { useCart } from "@/lib/shop";

export function SiteHeader() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur ring-1 ring-black/5">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-lg tracking-tight text-brand">
          LUMA<span className="text-coral">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-brand/80">
          <Link to="/" hash="shop" className="hover:text-brand">
            Phones
          </Link>
          <Link to="/" hash="about" className="hover:text-brand">
            About
          </Link>
          <Link to="/" hash="reviews" className="hover:text-brand">
            Reviews
          </Link>
          <Link to="/" hash="contact" className="hover:text-brand">
            Contact
          </Link>
        </nav>
        <Link
          to="/cart"
          className="flex items-center gap-2 text-sm font-semibold text-brand py-2 pr-3 pl-2 rounded-full chrome ring-1 ring-black/10"
        >
          <span className="shrink-0 size-4 grid place-items-center text-[10px]">{count}</span>
          Cart
        </Link>
      </div>
    </header>
  );
}
