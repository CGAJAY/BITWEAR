"use client";
import { Shirt, Gift } from 'lucide-react';
import { toast } from 'react-toastify';

const Home = () => {
  const notify = () => toast.success('Added to cart!');

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to Bitwear</h1>
      <div className="flex gap-4">
        <Shirt size={48} className="text-gray-700" />
        <Gift size={48} className="text-gray-700" />
      </div>
      <button
        onClick={notify}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Home;
