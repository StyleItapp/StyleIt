import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { value: "93%", label: "Style satisfaction rate", color: "text-primary" },
    { value: "4.8/5", label: "User satisfaction", color: "text-secondary" },
    { value: "250+", label: "Fashion collections", color: "text-accent" },
    { value: "June 15", label: "Launch date", color: "text-primary" },
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
              <h3 className={`text-4xl font-bold ${stat.color} font-playfair`}>{stat.value}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
