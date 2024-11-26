import React, { useState } from "react";
import { useCart } from "./cartcontext/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { cartItems, removeFromCart, updateCartQuantity } = useCart();
  const [paymentMethods, setPaymentMethods] = useState({});
  const navigate = useNavigate();

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleEditProfile = () => {
    navigate("/user-profile");
  };

  const handleCart = () => {
    navigate("/Cart");
  };

  const handleHistory = () => {
    navigate('/history')
  }

  const handlePaymentMethodChange = (productId, method) => {
    setPaymentMethods((prev) => ({
      ...prev,
      [productId]: method, // Simpan metode pembayaran untuk setiap produk
    }));
  };


  const handleCheckout = (product) => {
    const paymentMethod = paymentMethods[product.id];
    navigate("/confirmation", {
      state: { product, quantity: product.quantity, paymentMethod },
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen scroll-smooth">
      <header className="bg-gradient-to-br from-yellow-200 from-25% via-yellow-300 via-40% to-yellow-600 to-85% p-4 rounded-br-full mr-3.5 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/assets/logo.png" alt="Logo" className="w-20 h-20 mr-2" />
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
            <div
              className="flex items-center cursor-pointer"
              onClick={togglePopup}
            >
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

      <div className="pt-6 pl-6">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-gray-500 text-white rounded mb-4"
        >
          Kembali
        </button>
        <h1 className="text-2xl font-bold mb-4">Keranjang Belanja</h1>
      </div>

      <div className="p-6 h-screen overflow-scroll scrollbar-hidden">
        {cartItems.length === 0 ? (
          <p>Keranjang Anda kosong!</p>
        ) : (
          <div>
            {cartItems.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 bg-white shadow-md rounded mb-4"
              >
                <div>
                  <h2 className="font-bold">{product.name}</h2>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
                <div className="flex flex-row flex-1 gap-20 items-center jusitfy-center">
                  <p>Harga: Rp {product.price.toLocaleString()}</p>
                  <p>
                    Total: Rp{" "}
                    {(product.price * product.quantity).toLocaleString()}
                  </p>
                  <div className="flex items-center">
                    <label htmlFor={`quantity-${product.id}`} className="mr-2">
                      Jumlah:
                    </label>
                    <input
                      id={`quantity-${product.id}`}
                      type="number"
                      value={product.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value) || 1;
                        updateCartQuantity(product.id, newQuantity);
                      }}
                      className="w-16 border rounded text-center"
                    />

                    <div className="flex items-center ml-4">
                      <label htmlFor={`payment-${product.id}`} className="mr-2">
                        Metode Pembayaran:
                      </label>
                      <select
                        id={`payment-${product.id}`}
                        value={paymentMethods[product.id] || ""}
                        onChange={(e) =>
                          handlePaymentMethodChange(product.id, e.target.value)
                        }
                        className="border rounded px-2 py-1"
                      >
                        <option value="">Pilih</option>
                        <option value="COD">COD</option>
                        <option value="Transfer">Transfer</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCheckout(product)}
                    className="px-4 py-2 bg-green-500 text-white rounded ease-in duration-300 hover:bg-green-600"
                  >
                    Checkout
                  </button>

                  <button
                  onClick={() => removeFromCart(product.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded ease-in duration-300 hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="bg-gray-700 border-t p-4 text-left text-white">
        &copy; 2024 Your Company. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Cart;