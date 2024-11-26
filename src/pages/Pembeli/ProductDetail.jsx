import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./cartcontext/CartContext";

const ProductDetail = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state || {}; // Mendapatkan data produk dari `state`

  const [quantity, setQuantity] = useState(1); // Jumlah barang yang akan dibeli
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Default metode pembayaran

  // Fungsi untuk menambah jumlah barang
  const handleAddQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Fungsi untuk mengurangi jumlah barang
  const handleRemoveQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleAddToCart = () => {
    addToCart(product); // Hanya mengirim data produk, tanpa quantity tambahan
    alert(`Produk "${product.name}" berhasil ditambahkan ke keranjang!`);
  };  

  const handleCart = () => {
    navigate('/cart')
  }

  const handleHistory = () => {
    navigate('/history')
  }

  const handlePayment = () => {
    navigate("/confirmation", {
      state: { product, quantity, paymentMethod },
    });
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col scroll-smooth">
      {/* Header */}
      <header className="bg-gradient-to-br from-yellow-200 from-25% via-yellow-300 via-40% to-yellow-600 to-85% p-4 rounded-br-full mr-3.5 flex justify-between items-center">
      <div className="flex items-center">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="w-20 h-20 mr-2"
          />
        </div>
        <div className="flex items-center gap-4 mr-5">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              onClick={handleCart}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l3.6-7H5.4L7 13zm0 0l-1.35 2.7a1 1 0 00.9 1.5h11a1 1 0 00.9-1.5L17 13"
              />
              <circle cx="8" cy="20" r="1" fill="currentColor" />
              <circle cx="16" cy="20" r="1" fill="currentColor" />
            </svg>
          </button>
          <div className="relative">
            <div className="flex items-center cursor-pointer" onClick={togglePopup}>
              <img
                src="/assets/default-photo.jpg"
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <span className="ml-2 text-white font-medium">User Name</span>
            </div>
            {isPopupVisible && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 z-10">
                  <ul className="py-2 text-gray-700">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleEditProfile()}
                    >
                      Edit Profile
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleHistory()}
                    >
                      History
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
          </div>
        </div>  
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
          {/* Gambar dan Detail Produk */}
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-64 h-64 object-contain mb-4"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-black mb-4">
                {product.location}
              </p>
              <div className="flex flex-row gap-10">
                <h3 className="text-gray-500 mb-4">
                  {product.sold} Terjual
                </h3>
                <p className="text-gray-500 mb-4">
                  {product.stock} Stock
                </p>
              </div>
              <p className="text-gray-700 text-lg font-bold">
                Rp {product.price.toLocaleString()}
              </p>
              <div className="w-96 h-24 p-2 mt-6 overflow-scroll scrollbar-hidden ... rounded-lg shadow-md bg-gray-100">
                <p>
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold text-gray-800">
                Total Harga: <span className="text-green-500">Rp {totalPrice.toLocaleString()}</span>
            </h3>
          </div>

          {/* Input Tambah Barang */}
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handleRemoveQuantity}
              className="px-4 py-2 w-12 h-12 text-center bg-gray-300 rounded hover:bg-gray-400"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              readOnly
              className="w-20 h-12 text-center border rounded [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              onClick={handleAddQuantity}
              className="px-4 py-2 w-12 h-12 text-center bg-gray-300 rounded hover:bg-gray-400"
            >
              +
            </button>
          </div>

          {/* Metode Pembayaran */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Metode Pembayaran
            </h3>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                  className="text-blue-500"
                />
                <span>COD (Cash on Delivery)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="Transfer"
                  checked={paymentMethod === "Transfer"}
                  onChange={() => setPaymentMethod("Transfer")}
                  className="text-blue-500"
                />
                <span>Transfer</span>
              </label>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="mt-10 flex gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 w-48 bg-gray-400 text-white rounded shadow-md ease-in duration-300 hover:bg-gray-500"
            >
              Kembali
            </button>
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 w-48 bg-green-500 text-white rounded shadow-md ease-in duration-300 hover:bg-green-600"
            >
              Tambah Keranjang
            </button>
            <button
              onClick={handlePayment}
              className="px-6 py-2 w-48 bg-green-500 text-white rounded shadow-md ease-in duration-300 hover:bg-green-600"
            >
              Bayar Sekarang
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

export default ProductDetail;
