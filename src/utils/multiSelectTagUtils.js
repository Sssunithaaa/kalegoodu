export const categoryToOption = (category) => ({
  value: category.id,
  label: category.name,
});

export const filterCategories = (inputValue, categoriesData) => {
  const filteredOptions = categoriesData
    .map(categoryToOption)
    .filter((category) =>
      category.label.toLowerCase().includes(inputValue.toLowerCase())
    );

  return filteredOptions;
};

export const productToOption = (product) => ({
  value: product.product_id,
  label: product.name,
});

export const filterProducts = (inputValue, productsData) => {
  const filteredOptions = productsData
    .map(productToOption)
    .filter((product) =>
      product.label.toLowerCase().includes(inputValue.toLowerCase())
    );

  return filteredOptions;
};
