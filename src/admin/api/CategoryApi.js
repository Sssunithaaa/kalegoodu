export const fetchCategories = async ({ queryKey }) => {
  const [_key, searchKeyword, currentPage] = queryKey;
  const response = await fetch(`/api/categories?search=${searchKeyword}&page=${currentPage}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const deleteCategory = async ({ id }) => {
  const response = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to delete category');
  }
  return response.json();
};
