import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";


const HomePagePetani = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Beras Rojo Lele",
      price: 15000,
      stock: 500,
      imageUrl: "../public/assets/beras-rojo-lele.jpg",
    },
    {
      id: 2,
      name: "Beras Rojo Lele",
      price: 15000,
      stock: 500,
      imageUrl: "../public/assets/beras-rojo-lele.jpg",
    },
    {
      id: 3,
      name: "Beras Rojo Lele",
      price: 15000,
      stock: 500,
      imageUrl: "../public/assets/beras-rojo-lele.jpg",
    },
  ];

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleDelete = (id) => {
    console.log("Hapus produk dengan ID:", id);
  };

  const handleEdit = (id) => {
    console.log("Edit produk dengan ID:", id);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-yellow-400 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="w-20 h-20 mr-2"
          />
        </div>
        <div className="relative">
          <div className="flex items-center cursor-pointer" onClick={togglePopup}>
            <img
              src="/assets/default-photo.jpg"
              alt="Petani"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <span className="ml-2 text-white font-medium">Petani Name</span>
          </div>
          {isPopupVisible && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 z-10">
              <ul className="py-2 text-gray-700">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => alert("Edit Profile")}
                >
                  Edit Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => alert("History")}
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
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-700">Pesanan</h2>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Tambah Produk
          </button>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              productName={product.name}
              price={product.price}
              stock={product.stock}
              imageUrl={product.imageUrl}
              onDelete={() => handleDelete(product.id)}
              onEdit={() => handleEdit(product.id)}
            />
          ))}
        </div>
      </main>
      
      <footer className="bg-gray-400 border-t p-4 text-left text-gray-800">
        &copy; 2024 Your Company. All Rights Reserved.
      </footer>
    </div>
  );
};

export default HomePagePetani;
