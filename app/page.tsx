"use client";

import { useState } from "react";
import { products } from "../data/products";

export default function Home() {
  const [stocks, setStocks] = useState<{ [key: number]: number }>({});

  const handleChange = (id: number, value: string) => {
    setStocks((prev) => ({
      ...prev,
      [id]: Number(value),
    }));
  };

  const getMissing = (target: number, stock: number) => {
    return Math.max(target - stock, 0);
  };

  const itemsToPrepare = products
    .map((p) => {
      const stock = stocks[p.id] || 0;
      const missing = getMissing(p.target, stock);

      return {
        ...p,
        stock,
        missing,
      };
    })
    .filter((p) => p.missing > 0);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-800 p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Préparations du matin 🍳
      </h1>

      <div className="bg-white rounded-2xl border border-neutral-200 p-4 mb-6">
        <div className="grid grid-cols-4 text-sm text-neutral-500 mb-3">
          <span>Aliment</span>
          <span>Attendu</span>
          <span>Stock</span>
          <span>À faire</span>
        </div>

        {products.map((p) => {
          const stock = stocks[p.id] || 0;
          const missing = getMissing(p.target, stock);

          return (
            <div
              key={p.id}
              className="grid grid-cols-4 items-center py-2 border-t border-neutral-100"
            >
              <span className="font-medium">{p.name}</span>

              <span className="text-neutral-600">{p.target}</span>

              <input
                type="number"
                className="border border-neutral-200 rounded-lg px-2 py-1 w-20 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                value={stock}
                onChange={(e) => handleChange(p.id, e.target.value)}
              />

              <span
                className={
                  missing > 0
                    ? "text-amber-600 font-semibold"
                    : "text-emerald-600"
                }
              >
                {missing}
              </span>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 p-4">
        <h2 className="text-lg font-semibold mb-4">
          À préparer 🔥
        </h2>

        {itemsToPrepare.length === 0 ? (
          <p className="text-emerald-600 font-medium">
            Rien à préparer 👍
          </p>
        ) : (
          <ul className="space-y-2">
            {itemsToPrepare.map((item) => (
              <li
                key={item.id}
                className="flex justify-between text-sm border-b border-neutral-100 pb-1"
              >
                <span>{item.name}</span>
                <span className="font-semibold text-neutral-800">
                  {item.missing}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}