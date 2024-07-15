export const fetchCarouselProducts = async ({ queryKey }) => {
  const [_key] = queryKey;
  const response = await fetch('/api/carousel-products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const deleteCarouselProduct = async ({ id }) => {
  const response = await fetch(`/api/carousel-products/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
  return response.json();
};

export const addCarouselProduct = async (product) => {
  const response = await fetch('/api/carousel-products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Failed to add product');
  }
  return response.json();
};

export const editCarouselProduct = async (product) => {
  const response = await fetch(`/api/carousel-products/${product.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  return response.json();
};
