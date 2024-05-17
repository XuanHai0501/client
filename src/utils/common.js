export const formatPrice = (price) => {
  if (!price) return "";

  const priceFormatted = price.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${priceFormatted}đ`;
};
