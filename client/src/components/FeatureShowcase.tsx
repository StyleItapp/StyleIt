import { motion } from "framer-motion";

export default function FeatureShowcase() {
  const featuresPoints = [
    {
      title: "Weekly Style Updates",
      description: "Stay ahead with the latest fashion trends and styling tips",
    },
    {
      title: "Outfit Builder Tools",
      description: "Create stunning combinations from your existing wardrobe",
    },
    {
      title: "Color Coordination",
      description: "Learn which colors work best together for your skin tone",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 order-2 md:order-1">
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="rounded-lg shadow-lg overflow-hidden h-60"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Fashion styling" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="rounded-lg shadow-lg overflow-hidden h-60 mt-8"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Wardrobe organization" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="rounded-lg shadow-lg overflow-hidden h-60 mt-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Fashion outfit collage" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="rounded-lg shadow-lg overflow-hidden h-60"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Fashion styling" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
          <motion.div 
            className="md:w-1/2 md:pl-12 order-1 md:order-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white font-playfair">
              Style Inspiration & Guidance
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Our platform combines visual inspiration with practical style advice. From outfit coordination to wardrobe organization, we've got you covered.
            </p>

            <ul className="space-y-4">
              {featuresPoints.map((point, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-4">
                    <i className="fas fa-check text-primary"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold dark:text-white">{point.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {point.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
