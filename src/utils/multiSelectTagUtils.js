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
