'use client';
import Image from 'next/image';
import Link from 'next/link';

// Sample items data (you can replace this with real data)
const items = [
  {
    id: '1',
    name: 'Smart Jacket',
    price: 199.99,
    image: '/images/unix.jpg',
  },
  {
    id: '2',
    name: 'Tech Sneakers',
    price: 149.99,
    image: '/images/unix.jpg',
  },
  {
    id: '3',
    name: 'Digital Watch',
    price: 89.99,
    image: '/images/unix.jpg',
  },
  {
    id: '4',
    name: 'AR Glasses',
    price: 299.99,
    image: '/images/unix.jpg',
  },
];

export default function ItemsSection() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Our Featured Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/items/${item.id}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-full h-64">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}