import React from 'react';

const products = [
  {
    id: 1,
    name: 'Low-Flow Showerhead',
    description: 'Saves up to 50% water with high pressure.',
    image: 'low flow shower.jpg',
    link: 'https://www.ubuy.in/product/KOHLER-22169-G-CP-Forté-1-75-GPM-Multifunction-Showerhead',
  },
  {
    id: 2,
    name: 'Water-Efficient Washing Machines',
    description: 'Use less water per cycle compared to traditional washers.',
    image: 'Washingmachine.jpg',
    link: 'https://www.samsung.com/ca/laundry/all-laundry/?available-to-order',
  },
  {
    id: 3,
    name: 'Smart Garden Drip Kit',
    description: 'Automated and targeted watering system.',
    image: 'SmartKit.jpg',
    link: 'https://www.sveagritech.com/product/drip-irrigation-kit-of-automatic-watering-system-for-home-garden-for-50-plants/?srsltid=AfmBOop7eDXvOnm49ocZcDkaz7mQtKYljiAVatIjU4hafEO42JCkeSNa',
  },
];

export default function ProductSuggestions() {
  return (
    <div className="bg-gradient-to-br from-white via-green-50 to-green-100 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-green-700">🛍️ Water-Efficient Product Suggestions</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-green-200 rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-lg focus-within:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={`${product.name}`}
              loading="lazy"
              className="h-48 w-full object-cover rounded-t-xl"
            />
            <div className="p-5">
              <h3 className="text-lg font-extrabold text-green-800">{product.name}</h3>
              <p className="mt-1 text-sm text-green-700">{product.description}</p>
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-green-600 hover:text-green-800 hover:underline text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
                aria-label={`Buy ${product.name} online`}
              >
                🔗 Buy Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
