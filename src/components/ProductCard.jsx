
import React from "react";

const ProductCard = ({ productName, price, stock, imageUrl, onDelete, onEdit }) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 w-60">
      <img
        src={imageUrl}
        alt={productName}
        className="w-32 h-32 object-cover"
      />
      <h2 className="mt-4 text-lg font-semibold text-gray-800">{productName}</h2>
      <p className="mt-2 text-gray-500 text-sm">Rp {price.toLocaleString()}</p>
      <p className="mt-1 text-gray-500 text-sm">Stock: {stock}</p>
      <div className="flex gap-2 mt-4">
        <button
          onClick={onDelete}
          className="px-4 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
        >
          HAPUS
        </button>
        <button
          onClick={onEdit}
          className="px-4 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
        >
          EDIT
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
