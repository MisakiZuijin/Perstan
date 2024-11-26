import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HistoryContext } from "./historycontext/HistoryContext"; // Import History Context

const HistoryPage = () => {
  const { orderHistory } = useContext(HistoryContext); // Fetch order history from context
  const navigate = useNavigate();

  const handleViewProof = (order) => {
    navigate("/receipt-pembeli", { state: { order } }); // Mengirim data order ke halaman lihat bukti
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col scroll-smooth">
      {/* Header */}
      <header className="bg-gradient-to-br from-yellow-200 from-25% via-yellow-300 via-40% to-yellow-600 to-85% p-4 mr-3.5 rounded-br-full flex justify-between items-center">
        <div className="flex items-center">
          <img src="/assets/logo.png" alt="Logo" className="w-20 h-20 mr-2" />
        </div>
      </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Riwayat Pembayaran</h2>
                    {/* Order List */}
                    {orderHistory.length === 0 ? (
                        <p>Anda belum melakukan transaksi!</p>
                        ) : (
                        orderHistory.map((order, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-white shadow-md rounded mb-4">
                                <div>
                                    <img src={order.product?.imageUrl || "/path/to/default/image.jpg"} alt={order.product?.name} className="w-24 h-24 object-cover rounded" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold">{order.product?.name || "Produk Tidak Ditemukan"}</h3>
                                    <p>Jumlah: {order.quantity || "Data tidak tersedia"}</p>
                                    <p>Harga: Rp {order.product?.price ? order.product.price.toLocaleString() : "Data tidak tersedia"}</p>
                                    <p>Ongkir: Rp {order.shippingCost ? order.shippingCost.toLocaleString() : "Data tidak tersedia"}</p>
                                    <p>Total Harga: Rp {order.totalPrice ? order.totalPrice.toLocaleString() : "Data tidak tersedia"}</p>
                                    <p>Nama Pembeli: {order.address || "Data tidak tersedia"}</p>
                                    <p>Alamat: {order.address || "Data tidak tersedia"}</p>
                                    <p>Metode Pembayaran: {order.paymentMethod || "Data tidak tersedia"}</p>
                                    <button onClick={() => handleViewProof(order)} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600">
                                    Lihat Bukti
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
            </div>
        </main>

        <footer className="bg-gray-700 border-t p-4 text-left text-white">
            &copy; 2024 Your Company. All Rights Reserved.
        </footer>
    </div>
  );
};

export default HistoryPage;