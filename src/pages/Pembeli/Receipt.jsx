import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReceiptPembeli = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {}; // Mengambil data order yang diteruskan

  // Fungsi untuk kembali ke halaman history
  const handleBack = () => {
    navigate("/history");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-br from-yellow-200 from-25% via-yellow-300 via-40% to-yellow-600 to-85% p-4 mr-3.5 rounded-br-full flex justify-between items-center">
        <div className="flex items-center">
          <img src="/assets/logo.png" alt="Logo" className="w-20 h-20 mr-2" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Bukti Pembayaran</h2>
          {/* Detail Bukti Pembayaran */}
          <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded mb-4">
            <div>
              <img src={order.product?.imageUrl || "/path/to/default/image.jpg"} alt={order.product?.name} className="w-24 h-24 object-cover rounded" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{order.product?.name || "Produk Tidak Ditemukan"}</h3>
              <p><strong>Jumlah:</strong> {order.quantity}</p>
              <p><strong>Harga:</strong> Rp {order.product?.price.toLocaleString()}</p>
              <p><strong>Ongkir:</strong> Rp {order.shippingCost?.toLocaleString()}</p>
              <p><strong>Total Harga:</strong> Rp {order.totalPrice?.toLocaleString()}</p>
              <p><strong>Alamat Pengiriman:</strong> {order.address}</p>
              <p><strong>Metode Pembayaran:</strong> {order.paymentMethod}</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Kembali ke Riwayat
        </button>
      </main>

      <footer className="bg-gray-700 border-t p-4 text-left text-white">
        &copy; 2024 Your Company. All Rights Reserved.
      </footer>
    </div>
  );
};

export default ReceiptPembeli;