// Data dummy utama sesuai ketentuan tugas: disimpan dalam file JavaScript terpisah.
const dataKatalogBuku = [
  { id: "BK001", title: "Laskar Pelangi", author: "Andrea Hirata", category: "Novel", price: 85000, stock: 12, image: "img/buku1.png" },
  { id: "BK002", title: "Bumi", author: "Tere Liye", category: "Fantasi", price: 92000, stock: 8, image: "img/buku2.png" },
  { id: "BK003", title: "Atomic Habits", author: "James Clear", category: "Pengembangan Diri", price: 110000, stock: 15, image: "img/buku3.png" },
  { id: "BK004", title: "Filosofi Teras", author: "Henry Manampiring", category: "Filsafat", price: 98000, stock: 6, image: "img/buku4.png" },
  { id: "BK005", title: "Negeri 5 Menara", author: "Ahmad Fuadi", category: "Novel", price: 78000, stock: 10, image: "img/buku5.png" }
];

const dataTransaksiAwal = [
  { do: "DO-2026-001", customer: "Nadia Putri", email: "nadia@email.com", address: "Jakarta Selatan", bookId: "BK001", bookTitle: "Laskar Pelangi", qty: 1, payment: "Transfer Bank", total: 85000, date: "2026-11-01", status: "Dalam Pengiriman", courier: "JNE", package: "Reguler", step: 2 }
];
