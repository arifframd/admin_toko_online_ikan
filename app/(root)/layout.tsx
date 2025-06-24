import Sidebar from "@/components/Sidebar";
import { Toaster } from "sonner";

export default function WithSidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
      <Toaster />
    </div>
  );
}
