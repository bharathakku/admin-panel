import { 
  LayoutDashboard, 
  Users, 
  Car,
  ShoppingBag,
  UserCheck,
  MapPin,
  Bell, 
  Settings,
  BarChart3,
  MessageSquare,
  CreditCard,
  FileText,
  Headphones
} from "lucide-react";

export const NAV = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Orders", href: "/orders", icon: ShoppingBag },
  { label: "Customers", href: "/customers", icon: Users },
  { label: "Partners", href: "/partners", icon: UserCheck },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Customer Support", href: "/support", icon: Headphones },
  { label: "Settings", href: "/settings", icon: Settings },
];
