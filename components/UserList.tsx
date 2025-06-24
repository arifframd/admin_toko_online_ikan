import { userFetch } from "@/lib/userFetch";
import React from "react";

const UserList = async () => {
  const users = await userFetch();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Daftar Pengguna</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-700">Nama</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role || "User"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4" colSpan={3}>
                  Tidak ada data user
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
