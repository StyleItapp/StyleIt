import { Link } from "wouter";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export default function Footer() {
  const footerSections: FooterSection[] = [
    {
      title: "Features",
      links: [
        { text: "Style Recommendations", href: "#" },
        { text: "Wardrobe Management", href: "#" },
        { text: "Outfit Planning", href: "#" },
        { text: "Style Analysis", href: "#" },
        { text: "Trend Forecasts", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Style Blog", href: "#" },
        { text: "Fashion Guides", href: "#" },
        { text: "Success Stories", href: "#" },
        { text: "FAQs", href: "#" },
        { text: "Support", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About Us", href: "#" },
        { text: "Our Team", href: "#" },
        { text: "Partners", href: "#" },
        { text: "Privacy Policy", href: "#" },
        { text: "Terms of Service", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: "fab fa-instagram", href: "#" },
    { icon: "fab fa-twitter", href: "#" },
    { icon: "fab fa-linkedin", href: "#" },
    { icon: "fab fa-pinterest", href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 font-playfair">StyleIt</h3>
            <p className="text-gray-400 mb-4">
              Elevating your style journey through personalized recommendations and outfit inspiration.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <span className="text-gray-400 hover:text-white transition-colors">
                    <i className={`${link.icon} text-xl`}></i>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href}>
                      <span className="text-gray-400 hover:text-white transition-colors">
                        {link.text}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">© 2025 StyleIt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
