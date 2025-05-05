import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function PricingSection() {
  const features = [
    { text: "Scan your entire wardrobe" },
    { text: "Create magazine-style outfit collages" },
    { text: "AI-powered outfit recommendations" },
    { text: "Outfit calendar planning" },
    { text: "Smart packing list creator" },
    { text: "Wardrobe statistics" },
    { text: "Unlimited personal items" },
    { text: "No subscription fees" },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white font-playfair">
            Simple, One-Time Purchase
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Enjoy all StyleIt features for a single affordable price
          </p>
        </div>

        <motion.div
          className="max-w-lg mx-auto rounded-xl overflow-hidden shadow-lg bg-white dark:bg-card transition-transform duration-300 hover:-translate-y-2 gradient-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="p-8">
            <h3 className="text-2xl font-montserrat font-semibold mb-4 dark:text-white text-center">
              StyleIt App
            </h3>
            <div className="flex items-baseline justify-center mb-6">
              <span className="text-5xl font-bold font-playfair dark:text-white">
                $4.99
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-2">one-time</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
              All features, no subscriptions, no hidden fees
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="dark:text-gray-300">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 bg-gray-50 dark:bg-card border-t border-gray-100 dark:border-gray-700">
            <Button 
              className="w-full py-6 px-6 font-medium rounded-full transition-colors duration-300 bg-primary text-white hover:bg-opacity-90 shadow-lg"
            >
              Join Waitlist
            </Button>
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Coming to App Store and Google Play in June 2025
          </p>
        </div>
      </div>
    </section>
  );
}
