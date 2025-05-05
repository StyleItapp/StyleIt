import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="relative">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-2xl font-bold tracking-tight text-primary dark:text-white font-playfair">StyleIt</span>
          </Link>
        </div>

        <div className={cn("md:flex items-center md:space-x-8", mobileMenuOpen ? "flex flex-col absolute top-16 left-0 right-0 bg-background dark:bg-card p-4 space-y-4 shadow-md z-50" : "hidden")}>
          <Link href="#features">
            <span className="font-medium hover:text-primary transition-colors dark:hover:text-primary">Features</span>
          </Link>
          <Link href="#pricing">
            <span className="font-medium hover:text-primary transition-colors dark:hover:text-primary">Pricing</span>
          </Link>
          <Link href="#testimonials">
            <span className="font-medium hover:text-primary transition-colors dark:hover:text-primary">Success Stories</span>
          </Link>
          <Link href="#waitlist">
            <span className="font-medium hover:text-primary transition-colors dark:hover:text-primary">Join Waitlist</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-muted flex items-center justify-center"
          >
            {theme === "dark" ? (
              <i className="fas fa-sun text-yellow-300"></i>
            ) : (
              <i className="fas fa-moon text-gray-700"></i>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className="fas fa-bars text-xl dark:text-white"></i>
          </Button>
        </div>
      </nav>
    </header>
  );
}
