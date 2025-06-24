export const notifyAdmin = async ({ name, productName, quantity, address, order_id }: { name: string; productName: string; quantity: number; address: string; order_id: string }) => {
  const url = "https://api.fonnte.com/send";
  const data = {
    target: "081290097308",
    message: `🧾 Transaksi Baru Masuk!

👤 Nama: ${name}
📦 Produk: ${productName}
🔢 Jumlah: ${quantity} pcs
📍 Alamat: ${address}
🆔 Order ID: ${order_id}

Segera proses pesanan  ini ya!
`,
    countryCode: "62",
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.FONTE_SECRET_TOKEN!,
    },
    body: JSON.stringify(data),
  });

  console.log("Hasil dari response: ", res);
};
