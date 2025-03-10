import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export const Navbar = () => (
  <header className="bg-background sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6">
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <a href="#" className="text-foreground hover:text-foreground transition-colors">
        Dashboard
      </a>
      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
        Orders
      </a>
      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
        Products
      </a>
      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
        Customers
      </a>
      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
        Analytics
      </a>
    </nav>
    <Button variant="outline" size="icon" className="shrink-0 md:hidden">
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle navigation menu</span>
    </Button>
  </header>
);
