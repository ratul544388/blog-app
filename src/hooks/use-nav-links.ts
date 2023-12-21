import { Contact, FileQuestion, Home, ShieldQuestion } from "lucide-react";
import { usePathname } from "next/navigation";

export const useNavLinks = () => {
  const pathname = usePathname();
  const routes = [
    {
      label: "Home",
      href: "/",
      active: pathname === "/",
      icon: Home,
    },
    {
      label: "About",
      href: "/about",
      active: pathname === "/about",
      icon: ShieldQuestion,
    },
    {
      label: "Contact",
      href: "/contact",
      active: pathname === "/contact",
      icon: Contact,
    },
  ];

  return { navLinks: routes };
};
