// =====================
// AUTH SYSTEM - LocalStorage
// =====================

// Init admin default (jalankan sekali saat pertama kali)
function initDefaultAdmin() {
  let users = JSON.parse(localStorage.getItem("edukids_users")) || [];

  // Cek apakah admin sudah ada
  const adminExists = users.find((u) => u.role === "Admin");

  if (!adminExists) {
    const adminUser = {
      id: 1,
      nama: "Administrator",
      email: "admin@edukids.com",
      password: "admin123",
      role: "Admin",
      status: "Aktif",
      createdAt: new Date().toISOString(),
    };
    users.push(adminUser);
    localStorage.setItem("edukids_users", JSON.stringify(users));
  }
}

// Jalankan init admin saat script dimuat
initDefaultAdmin();

// Cek apakah user adalah admin
function isAdmin() {
  const currentUser = JSON.parse(localStorage.getItem("edukids_current_user"));
  return currentUser && currentUser.role === "Admin";
}

// Login function
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Email dan Password harus diisi!");
    return;
  }

  // Ambil data users dari localStorage
  const users = JSON.parse(localStorage.getItem("edukids_users")) || [];

  // Cari user dengan email dan password yang cocok
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    // Simpan session login
    localStorage.setItem("edukids_current_user", JSON.stringify(user));
    alert("Login berhasil! 🎉\nSelamat datang, " + user.nama);
    window.location.href = "home.html";
  } else {
    alert("Email atau Password salah!");
  }
}

// Register function
function register() {
  const nama = document.getElementById("regNama").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;

  // Validasi
  if (!nama) {
    alert("Nama harus diisi!");
    return;
  }
  if (!email) {
    alert("Email harus diisi!");
    return;
  }
  if (!password) {
    alert("Password harus diisi!");
    return;
  }
  if (password.length < 4) {
    alert("Password minimal 4 karakter!");
    return;
  }

  // Ambil data users yang sudah ada
  let users = JSON.parse(localStorage.getItem("edukids_users")) || [];

  // Cek apakah email sudah terdaftar
  if (users.find((u) => u.email === email)) {
    alert("Email sudah terdaftar! Silakan gunakan email lain.");
    return;
  }

  // Buat user baru
  const newUser = {
    id: Date.now(),
    nama: nama,
    email: email,
    password: password,
    role: "Orang Tua",
    status: "Aktif",
    createdAt: new Date().toISOString(),
  };

  // Tambahkan ke array users
  users.push(newUser);

  // Simpan ke localStorage
  localStorage.setItem("edukids_users", JSON.stringify(users));

  alert("Registrasi berhasil! 🎉\nSilakan login dengan akun Anda.");
  window.location.href = "login.html";
}

// Logout function
function logout() {
  localStorage.removeItem("edukids_current_user");
  localStorage.removeItem("edukids_dashboard_auth");
  window.location.href = "login.html";
}

// Logout dari dashboard (untuk halaman admin)
function logoutDashboard() {
  localStorage.removeItem("edukids_dashboard_auth");
  window.location.href = "../home.html";
}

// Get current user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("edukids_current_user"));
}

// Get all users
function getAllUsers() {
  return JSON.parse(localStorage.getItem("edukids_users")) || [];
}

// Format tanggal
function formatTanggalUser(dateString) {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
}

// Delete user
function deleteUser(id) {
  let users = getAllUsers();
  users = users.filter((u) => u.id !== id);
  localStorage.setItem("edukids_users", JSON.stringify(users));
}
