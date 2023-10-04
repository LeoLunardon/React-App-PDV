import React from "react";

const RegisterModal = ({
  product,
  modalOpen,
  handleModalClose,
  handleChange,
  handleSubmit,
}) => {
  if (!modalOpen) {
    return null;
  }

  return (
    <div className="modal-overlay ">
      <section class="bg-white rounded-lg dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Cadastre um produto
          </h2>
          <form action="#">
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div class="sm:col-span-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nome do produto
                </label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Digite o nome do produto"
                  required=""
                  onChange={handleChange}
                />
              </div>
              <div class="w-full">
                <label
                  for="price"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Preço de compra (R$)
                </label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="R$ 6.00"
                  required=""
                  onChange={handleChange}
                />
              </div>
              <div class="w-full">
                <label
                  for="salePrice"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Preço de venda (R$)
                </label>
                <input
                  type="number"
                  name="salePrice"
                  value={product.salePrice}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="R$ 10.00"
                  required=""
                  onChange={handleChange}
                />
              </div>
              <div class="w-full">
                <label
                  for="quantity"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Quantidade
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="15 un"
                  required=""
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Categoria
                </label>
                <select
                  id="category"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Bebidas</option>
                  <option value="TV">Lanches</option>
                </select>
              </div>
            </div>
            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                class="inline-flex mr-10 items-center px-5 py-2.5 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Cadastrar
              </button>
              <button
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={handleModalClose}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default RegisterModal;
