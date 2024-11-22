import React from "react";

const HomePagePembeli = () => {
  const products = [
    {
      id: 1,
      name: "Beras Rojo Lele",
      price: 15000,
      sold: "200 KG",
      imageUrl: "./public/assets/beras-rojo-lele.jpg",
    },
    {
      id: 2,
      name: "Beras Rojo Lele",
      price: 15000,
      sold: "200 KG",
      imageUrl: "./public/assets/beras-rojo-lele.jpg",
    },
    {
      id: 3,
      name: "Beras Rojo Lele",
      price: 15000,
      sold: "200 KG",
      imageUrl: "./public/assets/beras-rojo-lele.jpg",
    },
    {
      id: 4,
      name: "Beras Rojo Lele",
      price: 15000,
      sold: "200 KG",
      imageUrl: "./public/assets/beras-rojo-lele.jpg",
    },
    {
      id: 5,
      name: "Beras Rojo Lele",
      price: 15000,
      sold: "200 KG",
      imageUrl: "./public/assets/beras-rojo-lele.jpg",
    },
    {
      id: 6,
      name: "Beras Rojo Lele",
      price: 15000,
      sold: "200 KG",
      imageUrl: "./public/assets/beras-rojo-lele.jpg",
    },
        {
      id: 7,
      name: "Beras Rojo Lele",
      price: 15000,
      sold: "200 KG",
      imageUrl: "./public/assets/beras-rojo-lele.jpg",
    },
        {
      id: 8,
      name: "Beras Rojo Lele",
      price: 15000,
      sold: "200 KG",
      imageUrl: "./public/assets/beras-rojo-lele.jpg",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-yellow-400 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/path/to/logo.png"
            alt="Logo"
            className="w-8 h-8 mr-2"
          />
          <h1 className="text-xl font-bold text-white">Pertsan</h1>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Cari produk..."
            className="px-4 py-1 rounded-md focus:outline-none text-sm"
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z"
              />
            </svg>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l3.6-7H5.4L7 13zm0 0l-1.35 2.7a1 1 0 00.9 1.5h11a1 1 0 00.9-1.5L17 13"
              />
              <circle cx="7" cy="21" r="1" fill="currentColor" />
              <circle cx="17" cy="21" r="1" fill="currentColor" />
            </svg>
          </button>
          <div className="flex items-center">
            <img
              src="/path/to/profile-image.png"
              alt="User"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <span className="ml-2 text-white font-medium">User Name</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-32 h-32 object-contain mb-4"
              />
              <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
              <p className="text-gray-500">Rp {product.price.toLocaleString()}</p>
              <p className="text-gray-500 text-sm mt-2">{product.sold} Terjual</p>
              <button className="mt-4 px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                Beli
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePagePembeli;
