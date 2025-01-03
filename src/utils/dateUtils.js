// utils/dateUtils.js
export const formatDate = (isoString) => {
    const date = new Date(isoString);
  
    // Daftar nama bulan
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const day = date.getDate(); // Tanggal
    const month = monthNames[date.getMonth()]; // Nama bulan
    const year = date.getFullYear(); // Tahun
  
    const hours = date.getHours(); // Jam
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Menit dengan leading zero
    const ampm = hours >= 12 ? 'PM' : 'AM'; // AM/PM
    const formattedHours = hours % 12 || 12; // Format jam 12
  
    // Hasil format
    return `${day} ${month} ${year}, ${formattedHours}:${minutes} ${ampm}`;
  };
  