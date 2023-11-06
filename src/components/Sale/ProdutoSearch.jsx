import React from "react";

const ProductSearch = ({
  searchText,
  handleSearch,
  filteredProducts,
  handleSelectProduct,
}) => {
  return (
    <div className="relative" style={{ zIndex: 1 }}>
      <div className="relative ">
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Pesquise um produto"
          className="bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 rounded p-2 w-full mb-1"
        />
        {searchText.length > 0 && (
          <ul className="absolute font-medium overflow-y-auto max-h-72 text-gray-900 bg-white border border-gray-300 rounded-lg p-3 text-lg w-full">
            {filteredProducts
              .filter((product) =>
                product.name.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((product) => (
                <li
                  key={product._id}
                  onClick={() => handleSelectProduct(product)}
                  className="w-full flex justify-between items-center px-4 py-2 border-b border-gray-300 rounded-t-lg dark:border-gray-600 cursor-pointer"
                >
                  <div>{product.name}</div>
                  <div>R${product.salePrice}</div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
