import React from "react";
import ProductCard from "../../components/ProductCard";


const HomePagePetani = () => {
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

  const handleDelete = (id) => {
    console.log("Hapus produk dengan ID:", id);
  };

  const handleEdit = (id) => {
    console.log("Edit produk dengan ID:", id);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-yellow-400 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Pertsan</h1>
        <div className="flex items-center">
          <img
            src="/path/to/profile-image.png"
            alt="Petani"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <span className="ml-2 text-white font-medium">Petani Name</span>
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
    </div>
  );
};

export default HomePagePetani;
