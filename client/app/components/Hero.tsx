'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sample carousel data 
const carouselItems = [
  {
    title: 'Discover Premium Tech Fashion',
    description: 'Elevate your style with cutting-edge wearable technology',
    image: '/images/unix.jpg',
    cta: 'Shop Now',
    link: '/shop',
  },
  {
    title: 'Innovative Smart Wearables',
    description: 'Blend fashion with functionality seamlessly',
    image: '/images/unix.jpg',
    cta: 'Explore Collection',
    link: '/shop',
  },
  {
    title: 'Future of Fashion is Here',
    description: 'Experience the next generation of style',
    image: '/images/unix.jpg',
    cta: 'Learn More',
    link: '/about',
  },
];

export default function HeroSection() {
    // Current slide index
  const [currentSlide, setCurrentSlide] = useState(0); 
    // Hover state for pause
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide every 5 seconds, paused on hover
  useEffect(() => {
    if (isHovered) return; // Pause if hovered

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(timer); // Cleanup on unmount or hover change
  }, [isHovered]); // Re-run effect when isHovered changes

  // Navigation handlers
  const nextSlide = () => {
    // Loop back to first slide if at the end
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  
  const prevSlide = () => {
    // Loop back to last slide if at the beginning
    setCurrentSlide((prev) =>
      prev === 0 ? carouselItems.length - 1 : prev - 1
    );
  };

  return (
    <section
      className="relative w-full h-[600px] lg:h-[700px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Container */}
      <div className="absolute inset-0">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
              <div className="text-white max-w-2xl lg:max-w-3xl animate-fade-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6">
                  {item.title}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl mb-6 lg:mb-8">
                  {item.description}
                </p>
                <a
                  href={item.link}
                  className="inline-block bg-white text-black px-6 py-3 lg:px-8 lg:py-4 rounded-md font-medium text-base lg:text-lg hover:bg-gray-100 transition duration-300"
                >
                  {item.cta}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Hidden on small screens, visible on large */}
      <button
        onClick={prevSlide}
        className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 p-3 lg:p-4 rounded-full hover:bg-white transition-all z-10"
      >
        <ChevronLeft size={28} className="text-black" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 p-3 lg:p-4 rounded-full hover:bg-white transition-all z-10"
      >
        <ChevronRight size={28} className="text-black" />
      </button>

      {/* Dots Navigation - Adjusted for large screens */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 lg:space-x-3 z-10">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full transition-all ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}