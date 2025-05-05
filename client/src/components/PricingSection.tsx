import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PricingPlan {
  title: string;
  price: string;
  description: string;
  features: {
    text: string;
    included: boolean;
  }[];
  popular?: boolean;
  buttonText: string;
  buttonVariant: "primary" | "outline" | "secondary";
}

export default function PricingSection() {
  const plans: PricingPlan[] = [
    {
      title: "Essential",
      price: "$12",
      description: "Perfect for fashion beginners and style explorers",
      features: [
        { text: "Basic style recommendations", included: true },
        { text: "Limited wardrobe items", included: true },
        { text: "Community forum access", included: true },
        { text: "Monthly trend reports", included: true },
        { text: "Advanced outfit planning", included: false },
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
    },
    {
      title: "Pro",
      price: "$29",
      description: "Ideal for fashion enthusiasts looking to elevate their style",
      features: [
        { text: "Premium style recommendations", included: true },
        { text: "Unlimited wardrobe items", included: true },
        { text: "Advanced outfit planning", included: true },
        { text: "Weekly trend reports", included: true },
        { text: "Personal style analysis", included: true },
      ],
      popular: true,
      buttonText: "Get Started",
      buttonVariant: "primary",
    },
    {
      title: "Advanced",
      price: "$59",
      description: "For style enthusiasts and fashion leaders",
      features: [
        { text: "VIP style recommendations", included: true },
        { text: "1-on-1 stylist sessions", included: true },
        { text: "Seasonal wardrobe planning", included: true },
        { text: "Early trend forecasts", included: true },
        { text: "Exclusive style events", included: true },
      ],
      buttonText: "Get Started",
      buttonVariant: "secondary",
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white font-playfair">
            Flexible Subscription Options
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Choose the plan that fits your style journey and goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={cn(
                "rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2",
                plan.popular ? "gradient-border bg-white dark:bg-card transform scale-105 relative" : "bg-white dark:bg-card"
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-1 uppercase tracking-wider">
                  Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-xl font-montserrat font-semibold mb-4 dark:text-white">
                  {plan.title}
                </h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold font-playfair dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      {feature.included ? (
                        <>
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                          <span className="dark:text-gray-300">{feature.text}</span>
                        </>
                      ) : (
                        <>
                          <X className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-gray-400">{feature.text}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 bg-gray-50 dark:bg-card border-t border-gray-100 dark:border-gray-700">
                <Button 
                  className={cn(
                    "w-full py-6 px-6 font-medium rounded-full transition-colors duration-300",
                    plan.buttonVariant === "primary" ? "bg-primary text-white hover:bg-opacity-90 shadow-lg" : "",
                    plan.buttonVariant === "outline" ? "border-2 border-primary text-primary hover:bg-primary hover:text-white" : "",
                    plan.buttonVariant === "secondary" ? "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white" : ""
                  )}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
