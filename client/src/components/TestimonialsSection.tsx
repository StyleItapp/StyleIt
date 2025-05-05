import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Testimonial {
  image: string;
  name: string;
  role: string;
  stars: number;
  quote: string;
  betaTester: boolean;
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Sophie Chen",
      role: "Fashion Student",
      stars: 5,
      quote: "The app makes it so easy to scan my clothes and create outfit combinations. I love being able to plan my outfits for the week without trying everything on!",
      betaTester: true,
    },
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Marcus Johnson",
      role: "Busy Professional",
      stars: 5,
      quote: "As someone who travels frequently, the packing list feature is a game changer. StyleIt knows exactly what I need to pack based on my scanned wardrobe.",
      betaTester: true,
    },
    {
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Aisha Williams",
      role: "Style Enthusiast",
      stars: 4.5,
      quote: "I've always struggled with creating outfits from my clothes. The AI suggestions have helped me discover combinations I would never have thought of!",
      betaTester: true,
    },
  ];

  useEffect(() => {
    if (sliderRef.current) {
      const updateWidth = () => {
        if (sliderRef.current) {
          setWidth(sliderRef.current.offsetWidth);
        }
      };
      
      updateWidth();
      window.addEventListener('resize', updateWidth);
      
      return () => {
        window.removeEventListener('resize', updateWidth);
      };
    }
  }, []);

  const nextSlide = () => {
    if (currentIndex < testimonials.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white font-playfair">
            Beta Tester Feedback
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Hear from our beta testers who've experienced StyleIt's features firsthand
          </p>
        </div>

        <div className="relative overflow-x-hidden">
          <div 
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="w-full md:w-full lg:w-full flex-shrink-0 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white dark:bg-card p-8 rounded-xl shadow-lg h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div 
                      className="w-14 h-14 rounded-full mr-4 bg-cover bg-center"
                      style={{ backgroundImage: `url(${testimonial.image})` }}
                    ></div>
                    <div>
                      <h4 className="font-montserrat font-semibold dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(Math.floor(testimonial.stars))].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                      {testimonial.stars % 1 === 0.5 && (
                        <i className="fas fa-star-half-alt"></i>
                      )}
                    </div>
                    <p className="text-gray-600 italic dark:text-gray-300">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.betaTester && "Beta Program Participant • Spring 2025"}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Button
            variant="secondary"
            size="icon"
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-card shadow-lg flex items-center justify-center focus:outline-none z-10"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <i className="fas fa-chevron-left text-gray-700 dark:text-white"></i>
          </Button>
          
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-card shadow-lg flex items-center justify-center focus:outline-none z-10"
            onClick={nextSlide}
            disabled={currentIndex === testimonials.length - 1}
          >
            <i className="fas fa-chevron-right text-gray-700 dark:text-white"></i>
          </Button>
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
