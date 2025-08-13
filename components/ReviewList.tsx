import { Review } from "@/lib/models/reviews";
import { connectDB } from "@/lib/mongodb";
import React from "react";

const ReviewList = async () => {
  await connectDB();
  const reviews = await Review.find().populate("userId");

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-lg sm:text-2xl font-bold mb-4">Daftar Ulasan Pengguna</h2>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 sm:px-6 py-3 font-semibold text-gray-700 whitespace-nowrap">Nama User</th>
              <th className="px-3 sm:px-6 py-3 font-semibold text-gray-700 whitespace-nowrap">Rating</th>
              <th className="px-3 sm:px-6 py-3 font-semibold text-gray-700 whitespace-nowrap">Ulasan</th>
              <th className="px-3 sm:px-6 py-3 font-semibold text-gray-700 whitespace-nowrap">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 ? (
              reviews.map((review: any) => (
                <tr key={review._id} className="border-t hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-3">{review.userId?.name || "User tidak diketahui"}</td>
                  <td className="px-3 sm:px-6 py-3">{review.rating} / 5</td>
                  <td className="px-3 sm:px-6 py-3">
                    <div className="line-clamp-2 sm:line-clamp-3">{review.review}</div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
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
                <td className="px-3 sm:px-6 py-4 text-center text-gray-500" colSpan={4}>
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
