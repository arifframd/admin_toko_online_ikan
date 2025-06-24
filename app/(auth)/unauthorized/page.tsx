import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { signOut } from "@/auth";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4 text-yellow-500">
          <AlertTriangle size={48} />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Akses Ditolak</h1>
        <p className="text-gray-600 mb-6">Anda tidak memiliki izin untuk mengakses halaman ini. Silakan login sebagai admin untuk melanjutkan.</p>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Kembali ke Beranda</Button>
        </form>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
