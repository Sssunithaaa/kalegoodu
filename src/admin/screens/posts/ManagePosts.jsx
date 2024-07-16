import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../DataTable';
import { useDataTable } from '../../hooks/useDataTable';
import { deleteProduct, getAllProducts } from '../../../services/index/products';

const ManageProducts = () => {
  const {
    currentPage,
    searchKeyword,
    data: productsData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () => getAllProducts(searchKeyword, currentPage),
    dataQueryKey: "products",
    deleteDataMessage: "Product is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteProduct({
        slug,
        token,
      });
    },
  });

  const productt = {
    "brand": "Kalegoodu",
    "name": "Flower pot",
    "description": "Enhance your home with this exquisite flower pot, showcasing a blend of modern elegance and timeless beauty that complements any decor.",
    "price": 125.00,
    "discount": 50,
    "originalPrice": 250.00,
    "photo": null,
    "slug": "flower-pot",
    "createdAt": new Date().toISOString(),
    "categories": [{ title: "Home Decor" }],
    "tags": ["modern", "elegant", "decor"]
  };

  return (
    <DataTable
      pageTitle="Manage Products"
      dataListName="Products"
      searchInputPlaceHolder="Product name..."
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={["Name", "Brand", "Price", "Category", "Tags", ""]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={[productt]} // Using the static product data
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={productsData?.headers}
    >
      {[productt].map((product) => (
        <tr key={product.slug}>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    src={
                      product?.photo
                        ? stables.UPLOAD_FOLDER_BASE_URL + product?.photo
                        : 'path/to/sampleProductImage' // Replace with your sample image path
                    }
                    alt={product.name}
                    className="mx-auto object-cover rounded-lg w-10 aspect-square"
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">{product.name}</p>
              </div>
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{product.brand}</p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">${product.price.toFixed(2)}</p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {product.categories.length > 0
                ? product.categories
                    .slice(0, 3)
                    .map(
                      (category, index) =>
                        `${category.title}${
                          product.categories.slice(0, 3).length === index + 1
                            ? ""
                            : ", "
                        }`
                    )
                : "Uncategorized"}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex gap-x-2">
              {product.tags.length > 0
                ? product.tags.map((tag, index) => (
                    <p key={index}>
                      {tag}
                      {product.tags.length - 1 !== index && ","}
                    </p>
                  ))
                : "No tags"}
            </div>
          </td>
          <td className="px-5 flex flex-row py-14  text-sm bg-white border-b border-gray-200 space-x-5">
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => {
                deleteDataHandler({
                  slug: product?.slug,
                  token: userState.userInfo.token,
                });
              }}
            >
              Delete
            </button>
            <Link
              to={`/admin/products/manage/edit/${product?.slug}`}
              className="text-green-600 hover:text-green-900"
            >
              Edit
            </Link>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default ManageProducts;
