// =====================
// BOOKING SYSTEM - LocalStorage
// =====================

// Simpan booking ke localStorage
function saveBooking(namaAnak, wahana, tanggal) {
  // Ambil data booking yang sudah ada
  let bookings = JSON.parse(localStorage.getItem("edukids_bookings")) || [];

  // Buat booking baru
  const newBooking = {
    id: Date.now(), // ID unik berdasarkan timestamp
    namaAnak: namaAnak,
    wahana: wahana,
    tanggal: tanggal,
    status: "Pending", // Default status
    createdAt: new Date().toISOString(),
  };

  // Tambahkan ke array
  bookings.push(newBooking);

  // Simpan kembali ke localStorage
  localStorage.setItem("edukids_bookings", JSON.stringify(bookings));

  return newBooking;
}

// Ambil semua booking
function getAllBookings() {
  return JSON.parse(localStorage.getItem("edukids_bookings")) || [];
}

// Update status booking
function updateBookingStatus(id, newStatus) {
  let bookings = getAllBookings();
  const index = bookings.findIndex((b) => b.id === id);

  if (index !== -1) {
    bookings[index].status = newStatus;
    localStorage.setItem("edukids_bookings", JSON.stringify(bookings));
    return true;
  }
  return false;
}

// Hapus booking
function deleteBooking(id) {
  let bookings = getAllBookings();
  bookings = bookings.filter((b) => b.id !== id);
  localStorage.setItem("edukids_bookings", JSON.stringify(bookings));
}

// Format tanggal ke Indonesia
function formatTanggal(dateString) {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
}

// Get emoji wahana
function getWahanaEmoji(wahana) {
  const emojis = {
    Memanah: "🏹",
    Berkuda: "🐴",
    "Seni dan Kreativitas": "🎨",
  };
  return emojis[wahana] || "📌";
}

// Get status badge class
function getStatusBadge(status) {
  const badges = {
    Pending: "text-bg-warning",
    Konfirmasi: "text-bg-success",
    Dibatalkan: "text-bg-danger",
  };
  return badges[status] || "text-bg-secondary";
}

// Hitung statistik booking per wahana
function getBookingStats() {
  const bookings = getAllBookings();
  const stats = {
    total: bookings.length,
    memanah: bookings.filter((b) => b.wahana === "Memanah").length,
    berkuda: bookings.filter((b) => b.wahana === "Berkuda").length,
    seni: bookings.filter((b) => b.wahana === "Seni dan Kreativitas").length,
    pending: bookings.filter((b) => b.status === "Pending").length,
    konfirmasi: bookings.filter((b) => b.status === "Konfirmasi").length,
    dibatalkan: bookings.filter((b) => b.status === "Dibatalkan").length,
  };
  return stats;
}
