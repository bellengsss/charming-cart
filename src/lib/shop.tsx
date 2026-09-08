import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import phone1 from "@/assets/phone-1.jpg";
import phone2 from "@/assets/phone-2.jpg";
import phone3 from "@/assets/phone-3.jpg";

export type Product = {
  id: string;
  name: string;
  detail: string;
  price: number;
  image: string;
};

export const products: Product[] = [
  {
    id: "titanium-pro",
    name: "iPhone 16 Pro",
    detail: "Titanium, 256GB",
    price: 1099,
    image: phone1,
  },
  {
    id: "coral-16",
    name: "iPhone 16",
    detail: "Coral, 128GB",
    price: 799,
    image: phone2,
  },
  {
    id: "midnight-15",
    name: "iPhone 15",
    detail: "Midnight, 128GB",
    price: 629,
    image: phone3,
  },
];

export type CartLine = { product: Product; qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (product: Product) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "luma-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [qtys, setQtys] = useState<Record<string, number>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setQtys(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(qtys));
    } catch {
      /* ignore */
    }
  }, [qtys]);

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLine[] = products
      .filter((p) => (qtys[p.id] ?? 0) > 0)
      .map((p) => ({ product: p, qty: qtys[p.id]! }));

    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      add: (product) => setQtys((q) => ({ ...q, [product.id]: (q[product.id] ?? 0) + 1 })),
      setQty: (id, qty) => setQtys((q) => ({ ...q, [id]: Math.max(0, qty) })),
      remove: (id) => setQtys((q) => ({ ...q, [id]: 0 })),
      clear: () => setQtys({}),
    };
  }, [qtys]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
