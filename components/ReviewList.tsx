import { Review } from "@/lib/models/reviews";
import { connectDB } from "@/lib/mongodb";
import React from "react";

const ReviewList = async () => {
  await connectDB();
  const reviews = await Review.find().populate("userId"); // biar bisa ambil nama user

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Daftar Ulasan Pengguna</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-700">Nama User</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Rating</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Ulasan</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 ? (
              reviews.map((review: any) => (
                <tr key={review._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{review.userId?.name || "User tidak diketahui"}</td>
                  <td className="px-6 py-4">{review.rating} / 5</td>
                  <td className="px-6 py-4">{review.review}</td>
                  <td className="px-6 py-4">
                    {new Date(review.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4" colSpan={4}>
                  Belum ada ulasan dari pengguna.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewList;
