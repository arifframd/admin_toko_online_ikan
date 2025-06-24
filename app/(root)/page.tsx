import { auth } from "@/auth";
import ChartDashboard from "@/components/ChartDashboard";
import NewestOrders from "@/components/NewestOrders";
import NewestProducts from "@/components/NewestProducts";
import User from "@/lib/models/users";
import { connectDB } from "@/lib/mongodb";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  await connectDB();

  const admin = await User.findOne({ email: session?.user?.email, role: "admin" });

  if (!admin) {
    redirect("/unauthorized"); // ⛔ Jangan pakai "return redirect"
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5 py-3">
      <h2 className="text-2xl font-semibold mb-4">Statistik</h2>
      <div className="bg-muted rounded-xl p-6 shadow-sm">
        <ChartDashboard />
      </div>

      <div className="border-t my-10" />

      <h2 className="text-2xl font-semibold mb-4">Aktivitas Terbaru</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NewestOrders />
        <NewestProducts />
      </div>
    </div>
  );
}
