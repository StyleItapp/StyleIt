import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent -z-10"></div>

      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 dark:text-white font-playfair">
              Elevate Your <span className="text-primary">Style</span> Journey
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg dark:text-gray-300">
              Access exclusive fashion styling tips, wardrobe organization, and personalized outfit recommendations with flexible subscription options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#waitlist">
                <Button className="px-8 py-6 bg-primary text-white rounded-full font-medium font-montserrat hover:bg-opacity-90 transition-all transform hover:-translate-y-1 shadow-lg">
                  Join Waitlist
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" className="px-8 py-6 border-2 border-gray-300 dark:border-gray-700 rounded-full font-medium hover:border-primary dark:hover:border-primary transition-all transform hover:-translate-y-1">
                  Explore Features
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex items-center space-x-6">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-dark-bg bg-[url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80')] bg-cover"></div>
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-dark-bg bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80')] bg-cover"></div>
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-dark-bg bg-[url('https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80')] bg-cover"></div>
              </div>
              <div>
                <p className="text-sm font-medium dark:text-gray-300">Joined by <span className="text-primary font-semibold">2,500+</span> fashion enthusiasts</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2 flex justify-center md:justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="absolute -top-5 -left-5 w-20 h-20 bg-accent/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -right-5 w-32 h-32 bg-secondary/20 rounded-full blur-xl"></div>
              <div className="rounded-lg shadow-xl z-10 relative max-w-md w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Fashion style collage" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
