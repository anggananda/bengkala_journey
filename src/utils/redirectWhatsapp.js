export const redirectToWhatsApp = () => {
  const phoneNumber = "082236903868";
  const message = encodeURIComponent(
    "Hello, I would like to know more about your services"
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.location.href = whatsappUrl;
};
