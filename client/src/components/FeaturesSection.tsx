import { motion } from "framer-motion";

interface Feature {
  icon: string;
  title: string;
  description: string;
  bgClass: string;
  iconClass: string;
}

export default function FeaturesSection() {
  const features: Feature[] = [
    {
      icon: "fas fa-camera",
      title: "Scan Your Clothes",
      description: "Easily scan and digitize your entire wardrobe with our intelligent clothing recognition system.",
      bgClass: "bg-primary/10 dark:bg-primary/20",
      iconClass: "text-primary",
    },
    {
      icon: "fas fa-paint-brush",
      title: "Create Outfit Collages",
      description: "Make magazine-style outfit collages using your actual clothes to visualize complete looks.",
      bgClass: "bg-secondary/10 dark:bg-secondary/20",
      iconClass: "text-secondary",
    },
    {
      icon: "fas fa-magic",
      title: "AI Outfit Generator",
      description: "Let our AI create perfect outfit combinations from your scanned wardrobe based on your style preferences.",
      bgClass: "bg-accent/10 dark:bg-accent/20",
      iconClass: "text-accent",
    },
    {
      icon: "fas fa-calendar-alt",
      title: "Outfit Calendar",
      description: "Plan what to wear in advance and never stress about daily outfit decisions again.",
      bgClass: "bg-primary/10 dark:bg-primary/20",
      iconClass: "text-primary",
    },
    {
      icon: "fas fa-suitcase",
      title: "Smart Packing Lists",
      description: "Create packing lists that automatically tell you which clothes to pack based on your trip details.",
      bgClass: "bg-secondary/10 dark:bg-secondary/20",
      iconClass: "text-secondary",
    },
    {
      icon: "fas fa-chart-pie",
      title: "Wardrobe Analytics",
      description: "Get insights into your clothing usage, favorite combinations, and wardrobe statistics.",
      bgClass: "bg-accent/10 dark:bg-accent/20",
      iconClass: "text-accent",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white font-playfair">
            Your Wardrobe, Reimagined
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Turn your real clothes into a digital styling experience
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-card p-8 rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2"
              variants={item}
            >
              <div className={`w-14 h-14 ${feature.bgClass} rounded-full flex items-center justify-center mb-6`}>
                <i className={`${feature.icon} ${feature.iconClass} text-xl`}></i>
              </div>
              <h3 className="text-xl font-montserrat font-semibold mb-3 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
