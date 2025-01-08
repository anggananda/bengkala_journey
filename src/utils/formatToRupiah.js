export const formatToRupiah = (value) => {
  if (typeof value !== "number") {
    throw new Error("Input must be a number");
  }
  return "Rp " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
