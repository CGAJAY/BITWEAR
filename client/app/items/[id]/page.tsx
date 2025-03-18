import Image from "next/image";
import { notFound } from "next/navigation";

// Sample items data (replace this with database data in real-world apps)
const items = [
  {
    id: "1",
    name: "Smart Jacket",
    price: 199.99,
    image: "/images/unix.jpg",
    description: "A stylish smart jacket with built-in heating and connectivity.",
  },
  {
    id: "2",
    name: "Tech Sneakers",
    price: 149.99,
    image: "/images/unix.jpg",
    description: "Comfortable sneakers embedded with fitness tracking technology.",
  },
  {
    id: "3",
    name: "Digital Watch",
    price: 89.99,
    image: "/images/unix.jpg",
    description: "An advanced smartwatch with health tracking features.",
  },
  {
    id: "4",
    name: "AR Glasses",
    price: 299.99,
    image: "/images/unix.jpg",
    description: "Augmented reality glasses for an immersive experience.",
  },
];

export default function ItemPage({ params }: { params: { id: string } }) {
  const item = items.find((item) => item.id === params.id);

  if (!item) {
    return notFound(); // Show Next.js default 404 page if item doesn't exist
  }

  return (
    <section className="py-12 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900">{item.name}</h1>
        <p className="text-gray-600 text-lg">${item.price.toFixed(2)}</p>

        <div className="relative w-full h-96 my-6">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <p className="text-gray-700">{item.description}</p>

        <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
          Buy Now
        </button>
      </div>
    </section>
  );
}
