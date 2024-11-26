import React, { useState, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./cartcontext/CartContext"; // Menambahkan konteks Cart
import { HistoryContext } from "./historycontext/HistoryContext"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart(); // Ambil cartItems dari konteks
  const { addOrderHistory } = useContext(HistoryContext);
  const product = location.state?.product || {}; // Mendapatkan data produk dari `state`
  const quantity = location.state?.quantity || 1; // Mendapatkan jumlah barang dari `state`
  const paymentMethod = location.state?.paymentMethod || "COD"; // Metode pembayaran

  // Menyinkronkan produk yang terkini dengan menggunakan cartItems
  const updatedProduct = cartItems.find((item) => item.id === product?.id) || product;

  const shippingCost = 20000; // Biaya ongkir (contoh)
  const totalPrice = updatedProduct.price * quantity + shippingCost;

  const [address, setAddress] = useState(""); // Alamat pembeli

  const generateInvoicePDF = async (orderDetails) => {
    const logoUrl = "/assets/logo.png";

    // Membuat elemen invoice secara dinamis
    const invoiceElement = document.createElement("div");
    invoiceElement.style.position = "absolute";
    invoiceElement.style.top = "-10000px"; // Pastikan elemen tidak terlihat di layar
    invoiceElement.style.width = "800px"; // Lebar sesuai desain
    invoiceElement.style.fontFamily = "Arial, sans-serif"; // Gaya font sederhana
  
    invoiceElement.innerHTML = `
      <div style="border: 1px solid #ccc; padding: 20px; border-radius: 8px; background-color: #f9f9f9;">
        <header style="display: flex; align-items: center; margin-bottom: 20px;">
          <img src="${logoUrl}" alt="Logo Toko" style="width: 80px; height: auto; margin-right: 20px;" />
          
          <div style="flex: 1;">
            <h1 style="font-size: 24px; font-weight: bold; margin: 0;">INVOICE</h1>
            <p style="font-size: 14px; color: #555; margin: 4px 0;">No. Invoice: ${orderDetails.product.id}</p>
            <p style="font-size: 14px; color: #555; margin: 4px 0;">Tanggal: ${new Date().toLocaleDateString()}</p>
          </div>
        </header>
  
        <section style="margin-bottom: 20px;">
          <p><strong>Kepada:</strong></p>
          <p>${orderDetails.address}</p>
          <p><strong>Metode Pembayaran:</strong> ${orderDetails.paymentMethod}</p>
        </section>
  
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f1f1f1;">
              <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Keterangan</th>
              <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Harga</th>
              <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Jumlah</th>
              <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Ongkir</th>
              <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 10px; text-align: left; border: 1px solid #ddd;">${orderDetails.product.name}</td>
              <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">Rp ${orderDetails.product.price.toLocaleString()}</td>
              <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">${orderDetails.quantity}</td>
              <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">Rp ${orderDetails.shippingCost.toLocaleString()}</td>
              <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">Rp ${orderDetails.totalPrice.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
  
        <section style="margin-bottom: 20px; text-align: right;">
          <p><strong>Subtotal:</strong> Rp ${(orderDetails.product.price * orderDetails.quantity).toLocaleString()}</p>
          <p><strong>Ongkir:</strong> Rp ${orderDetails.shippingCost.toLocaleString()}</p>
          <p><strong>Total:</strong> Rp ${orderDetails.totalPrice.toLocaleString()}</p>
        </section>
  
        <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #555;">
          <p>Terima kasih atas pembelian Anda!</p>
        </footer>
      </div>
    `;
    document.body.appendChild(invoiceElement); // Tambahkan ke DOM sementara
  
    try {
      // Proses pembuatan PDF
      const canvas = await html2canvas(invoiceElement);
      const data = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
  
      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${orderDetails.product.id}.pdf`);
    } finally {
      // Hapus elemen invoice dari DOM
      document.body.removeChild(invoiceElement);
    }
  };
  

  const handleConfirmOrder = async () => {
    if (!address.trim()) {
      alert("Harap masukkan alamat pengiriman!");
      return;
    }

    if (!updatedProduct.price || !quantity) {
      alert("Data produk tidak lengkap!");
      return;
    }

    const orderDetails = {
      product: updatedProduct,
      quantity,
      totalPrice,
      address,
      paymentMethod,
      shippingCost,
    };

    // Simpan data ke history
    addOrderHistory(orderDetails);

    // Periksa metode pembayaran
    if (paymentMethod === "COD") {
      alert(`Pesanan Anda telah dikonfirmasi menggunakan metode COD.\nTotal Harga: Rp ${totalPrice.toLocaleString()}`);
    } else if (paymentMethod === "Transfer") {
      alert(`Invoice pembayaran telah dibuat. Total Harga: Rp ${totalPrice.toLocaleString()}`);
      await generateInvoicePDF(orderDetails); // Otomatis download invoice
    }

    navigate("/history", {
      state: { orderDetails },
    });
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
          <h2 className="text-2xl font-bold mb-4">Konfirmasi Pesanan</h2>

          {/* Detail Produk */}
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={updatedProduct.imageUrl}
              alt={updatedProduct.name}
              className="w-64 h-64 object-contain mb-4"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold">{updatedProduct.name}</h3>
              <p className="text-gray-700">Jumlah: {quantity}</p>
              <p className="text-gray-700">
                Harga Produk: Rp {(updatedProduct.price * quantity).toLocaleString()}
              </p>
              <p className="text-gray-700">Biaya Ongkir: Rp {shippingCost.toLocaleString()}</p>
              <p className="text-lg font-bold mt-2">
                Total Harga: Rp {totalPrice.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Alamat Pembeli */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Alamat Pengiriman</h3>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Masukkan alamat lengkap Anda"
              className="w-full p-3 border rounded-md resize-none"
              rows="3"
            />
          </div>

          {/* Metode Pembayaran */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Metode Pembayaran</h3>
            <p>{paymentMethod}</p>
          </div>

          {/* Tombol Aksi */}
          <div className="mt-10 flex gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 w-48 bg-gray-400 text-white rounded shadow-md hover:bg-gray-500"
            >
              Kembali
            </button>
            <button
              onClick={handleConfirmOrder}
              className="px-6 py-2 w-48 bg-green-500 text-white rounded shadow-md hover:bg-green-600"
            >
              Konfirmasi Pesanan
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-700 border-t p-4 text-left text-white">
        &copy; 2024 Your Company. All Rights Reserved.
      </footer>
    </div>
  );
};

export default ConfirmationPage;
