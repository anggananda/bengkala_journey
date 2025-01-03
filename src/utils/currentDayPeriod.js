export const getCurrentDayPeriod = () => {
    const hour = new Date().getHours(); // Mengambil jam saat ini
    if (hour >= 6 && hour < 12) {
      return "Morning"; // 6 AM - 11:59 AM
    } else if (hour >= 12 && hour < 16) {
      return "Afternoon"; // 12 PM - 3:59 PM
    } else if (hour >= 16 && hour < 18) {
      return "Evening"; // 4 PM - 5:59 PM
    } else {
      return "Night"; // 6 PM - 5:59 AM
    }
  };
  