import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import { useEffect } from "react";

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
export function MobileMenu() {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader></SheetHeader>
        {navigationItems.map((item) => (
          <div key={item.label}>
            <a href={item.href}>
              <Button variant="ghost" className="px-3 text-[15px]" size={"sm"}>
                {item.label}
              </Button>
            </a>
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
}
