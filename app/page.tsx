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

  const itemsWithStock = products.map((product) => {
    const stock = stocks[product.id] || 0;
    const missing = getMissing(product.target, stock);

    return {
      ...product,
      stock,
      missing,
    };
  });

  const itemsToPrepare = itemsWithStock.filter((item) => item.missing > 0);

  const groupedProducts = itemsWithStock.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof itemsWithStock>);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-800 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Préparations du matin 🍳</h1>

        <div className="space-y-6">
          {Object.entries(groupedProducts).map(([category, items]) => (
            <section
              key={category}
              className="bg-white rounded-2xl border border-neutral-200 p-4"
            >
              <h2 className="text-lg font-semibold mb-4">{category}</h2>

              <div className="grid grid-cols-4 text-sm text-neutral-500 mb-3">
                <span>Aliment</span>
                <span>Attendu</span>
                <span>Stock</span>
                <span>À faire</span>
              </div>

              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-4 items-center py-2 border-t border-neutral-100"
                  >
                    <span className="font-medium">{item.name}</span>

                    <span className="text-neutral-600">{item.target}</span>

                    <input
                      type="number"
                      min="0"
                      className="border border-neutral-200 rounded-lg px-2 py-1 w-20 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                      value={item.stock}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                    />

                    <span
                      className={
                        item.missing > 0
                          ? "text-amber-600 font-semibold"
                          : "text-emerald-600"
                      }
                    >
                      {item.missing}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="bg-white rounded-2xl border border-neutral-200 p-4 mt-6">
          <h2 className="text-lg font-semibold mb-4">Liste à préparer 🔥</h2>

          {itemsToPrepare.length === 0 ? (
            <p className="text-emerald-600 font-medium">Rien à préparer 👍</p>
          ) : (
            <ul className="space-y-2">
              {itemsToPrepare.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between text-sm border-b border-neutral-100 pb-2"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-neutral-500 text-xs">{item.category}</p>
                  </div>

                  <span className="font-semibold text-neutral-800">
                    {item.missing}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}