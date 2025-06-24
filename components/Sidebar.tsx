import Link from "next/link";
import { Home, Package, Users, Book, Pen } from "lucide-react";
import SignOut from "./SignOut";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/products", label: "Products", icon: Package },
  { href: "/orders", label: "Orders", icon: Book },
  { href: "/users", label: "Users", icon: Users },
  { href: "/reviews", label: "Reviews", icon: Pen },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4 space-y-4">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
      <nav className="space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 text-gray-700">
            <Icon size={18} /> <span>{label}</span>
          </Link>
        ))}
        <SignOut />
      </nav>
    </aside>
  );
}
