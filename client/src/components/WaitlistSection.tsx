import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  role: z.string({ required_error: "Please select your role" }),
  newsletter: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export default function WaitlistSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      newsletter: false,
    },
  });

  const waitlistMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: () => {
      setFormSubmitted(true);
      toast({
        title: "Success!",
        description: "Thank you for joining our waitlist! We'll notify you when StyleIt launches.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: FormValues) {
    waitlistMutation.mutate(data);
  }

  return (
    <section id="waitlist" className="py-20 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 -z-10"></div>

      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-3xl mx-auto bg-white dark:bg-card rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white font-playfair">
                Join Our Waitlist
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Be among the first to access StyleIt when we launch in May-June 2025. Early subscribers get exclusive app features!
              </p>

              {!formSubmitted ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-background dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-background dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Your Style Interest
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-background dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                <SelectValue placeholder="Select your interest" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="casual">Casual Fashion</SelectItem>
                              <SelectItem value="formal">Formal Attire</SelectItem>
                              <SelectItem value="streetwear">Streetwear</SelectItem>
                              <SelectItem value="minimal">Minimalist Style</SelectItem>
                              <SelectItem value="vintage">Vintage/Retro</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="newsletter"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                          </FormControl>
                          <FormLabel className="text-sm text-gray-600 dark:text-gray-400">
                            I'd like to receive news and updates about StyleIt
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={waitlistMutation.isPending}
                      className="w-full py-6 px-6 bg-primary text-white font-medium rounded-full hover:bg-opacity-90 transition-colors duration-300 shadow-md"
                    >
                      {waitlistMutation.isPending ? "Submitting..." : "Join Waitlist"}
                    </Button>
                  </form>
                </Form>
              ) : (
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-lg">
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    <p>Thank you for joining our waitlist! We'll notify you when StyleIt launches.</p>
                  </div>
                </div>
              )}
            </div>
            <div className="md:w-1/2 bg-primary relative hidden md:block">
              <div className="absolute inset-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center mix-blend-overlay opacity-60"></div>
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="text-white text-center">
                  <h3 className="text-2xl font-bold mb-4 font-playfair">Early Access Offer</h3>
                  <p className="mb-6">Early waitlist subscribers get bonus outfit templates and premium features</p>
                  <div className="inline-block border-2 border-white rounded-full px-6 py-3 font-bold">
                    Launch: May-June 2025
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
