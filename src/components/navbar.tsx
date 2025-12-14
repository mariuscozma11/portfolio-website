import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    {
      label: "Home",
      href: `#`,
    },
    {
      label: "Projects",
      href: `#`,
    },
    {
      label: "Contact",
      href: `#`,
    },
  ];
  return (
    <div className="fixed top-0 left-0 right-0 border-b border-dashed w-full">
      <div
        className={`max-w-7xl mx-auto transition-all duration-500 ease-in-out px-4 border-x border-dashed
        ${
          isScrolled
            ? "py-2 backdrop-blur-sm  shadow-md"
            : "py-4 shadow-none"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo - Left */}
          <a href={`#`} className="flex items-center space-x-2 cursor-pointer">
            <div className="text-xl  tracking-tight">Marius Cozma</div>
          </a>
          {/* Desktop Navigation - Right */}
          <div className="hidden lg:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <div key={item.label}>
                <a href={item.href}>
                  <Button
                    variant='ghost'
                    className="px-3 text-[15px]"
                    size={'sm'}
                  >
                    {item.label}
                  </Button>
                </a>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
