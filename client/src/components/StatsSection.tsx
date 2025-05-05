import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { 
      value: "97%", 
      label: "Beta Tester Satisfaction", 
      color: "text-primary",
      icon: "fas fa-smile",
    },
    { 
      value: "1,000+", 
      label: "Beta Participants", 
      color: "text-secondary",
      icon: "fas fa-users",
    },
    { 
      value: "85%", 
      label: "Time Saved Planning Outfits", 
      color: "text-accent",
      icon: "fas fa-clock",
    },
    { 
      value: "June '25", 
      label: "Launch Date", 
      color: "text-primary",
      icon: "fas fa-rocket",
    },
  ];

  return (
    <section className="bg-gray-100 dark:bg-muted py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mb-3">
                <i className={`${stat.icon} ${stat.color}`}></i>
              </div>
              <h3 className={`text-3xl font-bold ${stat.color} font-playfair`}>{stat.value}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
