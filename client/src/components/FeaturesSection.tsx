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
      icon: "fas fa-tshirt",
      title: "Personalized Styling",
      description: "Get outfit recommendations tailored to your body type, style preferences, and existing wardrobe.",
      bgClass: "bg-primary/10 dark:bg-primary/20",
      iconClass: "text-primary",
    },
    {
      icon: "fas fa-camera",
      title: "Virtual Try-On",
      description: "See how new clothes would look on you before purchasing with our augmented reality tool.",
      bgClass: "bg-secondary/10 dark:bg-secondary/20",
      iconClass: "text-secondary",
    },
    {
      icon: "fas fa-box",
      title: "Wardrobe Organization",
      description: "Digitize and categorize your entire wardrobe for easy outfit planning and shopping.",
      bgClass: "bg-accent/10 dark:bg-accent/20",
      iconClass: "text-accent",
    },
    {
      icon: "fas fa-shopping-bag",
      title: "Smart Shopping Lists",
      description: "Get recommendations for pieces that will complement your existing wardrobe and style goals.",
      bgClass: "bg-primary/10 dark:bg-primary/20",
      iconClass: "text-primary",
    },
    {
      icon: "fas fa-chart-line",
      title: "Trend Forecasts",
      description: "Stay ahead with personalized fashion trend predictions based on your style profile.",
      bgClass: "bg-secondary/10 dark:bg-secondary/20",
      iconClass: "text-secondary",
    },
    {
      icon: "fas fa-comments",
      title: "Style Community",
      description: "Connect with fashion enthusiasts and stylists for inspiration and advice on your outfits.",
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
            Smart Styling Features
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Everything you need to elevate your personal style
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
