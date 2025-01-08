export const convertReviewToStars = (review) => {
  // Hitung jumlah bintang penuh
  const fullStars = Math.floor(review);
  // Tentukan apakah ada setengah bintang
  const hasHalfStar = review % 1 >= 0.5;

  // Gabungkan bintang penuh dan setengah bintang
  const stars = "⭐️".repeat(fullStars) + (hasHalfStar ? "⭐️½" : "");

  return stars;
};
