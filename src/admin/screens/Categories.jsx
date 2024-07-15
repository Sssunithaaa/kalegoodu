import React from 'react';
import useAdminData from '../hooks/AdminDataHook';
import { fetchCategories, deleteCategory } from '../api/CategoryApi'
import { img1,img,img2,img3,img4 } from '../../assets/images';
const CategoriesAdmin = () => {
  const {

    currentPage,
    searchKeyword,
    data: categories,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    handleSearchKeywordChange,
    handleSearchSubmit,
    handleDelete,
    setCurrentPage,
  } = useAdminData({
    dataQueryFn: fetchCategories,
    dataQueryKey: 'categories',
    mutateDeleteFn: deleteCategory,
    deleteDataMessage: 'Category deleted successfully!',
  });
 const initialCategories = [
    { id: 1, name: 'Electronics', image: img },
    { id: 2, name: 'Clothing', image: img1 },
    { id: 3, name: 'Books', image: img2 },
    { id: 4, name: 'Hats', image: img3 },
    { id: 5, name: 'Post', image: img4 },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearchKeywordChange}
          placeholder="Search categories"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Search
        </button>
      </form>
      {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap">
          {initialCategories.map((category) => (
            <div key={category.id} className="m-4 text-center">
              <img
                src={category.image}
                alt={category.name}
                className="w-40 h-40 rounded-full object-cover mx-auto"
              />
              <div className="mt-2">{category.name}</div>
              <button
                onClick={() => handleDelete(category.id)}
                className="bg-red-500 text-white px-4 py-2 mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesAdmin;
