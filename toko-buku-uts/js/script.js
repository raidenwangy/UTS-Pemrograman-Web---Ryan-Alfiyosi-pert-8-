// Script utama: autentikasi demo, manipulasi DOM, validasi form, dan transaksi.
const rupiah = value => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
// Ambil data katalog. Data lama di LocalStorage dilengkapi properti gambar
// berdasarkan ID buku agar sampul setiap buku tetap sesuai.
const getBooks = () => {
  const saved = JSON.parse(localStorage.getItem("bukukita_books"));
  if (!saved) return dataKatalogBuku;
  return saved.map(book => {
    const defaultBook = dataKatalogBuku.find(item => item.id === book.id);
    return {
      ...book,
      image: book.image || defaultBook?.image || "img/buku1.png"
    };
  });
};
const saveBooks = books => localStorage.setItem("bukukita_books", JSON.stringify(books));
const getOrders = () => JSON.parse(localStorage.getItem("bukukita_orders")) || dataTransaksiAwal;
const saveOrders = orders => localStorage.setItem("bukukita_orders", JSON.stringify(orders));
const byId = id => document.getElementById(id);

function showModal(id) { const modal = byId(id); if (modal) { modal.classList.add("show"); modal.setAttribute("aria-hidden", "false"); } }
function closeModal(modal) { modal.classList.remove("show"); modal.setAttribute("aria-hidden", "true"); }
document.querySelectorAll("[data-modal]").forEach(btn => btn.addEventListener("click", () => showModal(btn.dataset.modal)));
document.querySelectorAll("[data-close]").forEach(btn => btn.addEventListener("click", () => closeModal(btn.closest(".modal"))));
document.querySelectorAll(".modal").forEach(modal => modal.addEventListener("click", e => { if (e.target === modal) closeModal(modal); }));
document.querySelectorAll("[data-logout]").forEach(btn => btn.addEventListener("click", () => { localStorage.removeItem("bukukita_login"); location.href = "index.html"; }));

// Login demo. Kredensial dapat diganti sesuai kebutuhan demonstrasi.
const loginForm = byId("loginForm");
if (loginForm) loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = byId("email").value.trim(), password = byId("password").value;
  if (email === "admin@bukukita.com" && password === "admin123") {
    localStorage.setItem("bukukita_login", "true"); location.href = "dashboard.html";
  } else alert("email/password yang anda masukkan salah");
});
const forgotForm = byId("forgotForm");
if (forgotForm) forgotForm.addEventListener("submit", e => { e.preventDefault(); alert("Jika email terdaftar, instruksi pemulihan akan dikirim. (Simulasi)"); closeModal(byId("forgotModal")); });
const registerForm = byId("registerForm");
if (registerForm) registerForm.addEventListener("submit", e => { e.preventDefault(); alert("Pendaftaran berhasil disimulasikan. Silakan login menggunakan akun demo."); closeModal(byId("registerModal")); });

// Dashboard greeting dan statistik.
if (byId("greeting")) {
  const hour = new Date().getHours();
  byId("greeting").textContent = (hour < 11 ? "Selamat pagi" : hour < 15 ? "Selamat siang" : hour < 18 ? "Selamat sore" : "Selamat malam") + ", Admin!";
  const books = getBooks(), orders = getOrders();
  byId("statBooks").textContent = books.length;
  byId("statOrders").textContent = orders.length;
  byId("statStock").textContent = books.reduce((sum, b) => sum + Number(b.stock), 0);
  byId("statShipping").textContent = orders.filter(o => o.status === "Dalam Pengiriman").length;
}

// Katalog: render dari array dan tambah baris menggunakan DOM.
function renderBooks(filter = "") {
  const tbody = byId("bookTable"); if (!tbody) return;
  const books = getBooks().filter(b => (b.title + " " + b.author).toLowerCase().includes(filter.toLowerCase()));
  tbody.innerHTML = "";
  if (!books.length) { tbody.innerHTML = '<tr><td colspan="7" class="empty">Buku tidak ditemukan.</td></tr>'; return; }
  books.forEach(book => {
    const tr = document.createElement("tr");
    const imageCell = document.createElement("td");
    const cover = document.createElement("img");
    cover.className = "book-cover-thumb";
    cover.src = book.image || "img/buku1.png";
    cover.alt = "Sampul " + book.title;
    imageCell.appendChild(cover);
    tr.appendChild(imageCell);
    [book.id, book.title, book.author, book.category, rupiah(book.price), book.stock].forEach(value => {
      const td = document.createElement("td"); td.textContent = value; tr.appendChild(td);
    });
    const action = document.createElement("td"), button = document.createElement("button");
    button.className = "btn btn-danger btn-small"; button.textContent = "Hapus";
    button.addEventListener("click", () => {
      if (confirm("Hapus buku " + book.title + " dari katalog?")) { saveBooks(getBooks().filter(b => b.id !== book.id)); renderBooks(byId("searchBook")?.value || ""); populateBookOptions(); }
    });
    action.appendChild(button); tr.appendChild(action); tbody.appendChild(tr);
  });
}
if (byId("bookTable")) {
  renderBooks();
  byId("searchBook").addEventListener("input", e => renderBooks(e.target.value));
  byId("openBookForm").addEventListener("click", () => showModal("bookModal"));
  byId("bookForm").addEventListener("submit", e => {
    e.preventDefault(); const form = e.currentTarget, fd = new FormData(form), books = getBooks();
    const book = { id: "BK" + String(Date.now()).slice(-6), title: fd.get("title").trim(), author: fd.get("author").trim(), category: fd.get("category").trim(), price: Number(fd.get("price")), stock: Number(fd.get("stock")), image: "img/buku1.png" };
    books.push(book); saveBooks(books); renderBooks(); populateBookOptions(); form.reset(); closeModal(byId("bookModal")); alert("Buku berhasil ditambahkan ke katalog.");
  });
}

// Checkout dan manipulasi transaksi.
function populateBookOptions() {
  const select = byId("orderBook"); if (!select) return;
  select.innerHTML = '<option value="">Pilih buku</option>';
  getBooks().forEach(b => { const opt = document.createElement("option"); opt.value = b.id; opt.textContent = `${b.title} — ${rupiah(b.price)} (stok ${b.stock})`; select.appendChild(opt); });
}
function renderOrderTable() {
  const tbody = byId("orderTable"); if (!tbody) return; tbody.innerHTML = "";
  getOrders().forEach(o => {
    const tr = document.createElement("tr");
    [o.do, o.customer, o.bookTitle, o.qty, rupiah(o.total), o.status].forEach(v => { const td = document.createElement("td"); td.textContent = v; tr.appendChild(td); });
    const td = document.createElement("td"), edit = document.createElement("button");
    edit.className = "btn btn-outline btn-small"; edit.textContent = "Ubah status";
    edit.addEventListener("click", () => {
      const next = prompt("Masukkan status: Diproses / Dalam Pengiriman / Selesai", o.status);
      if (next && ["Diproses", "Dalam Pengiriman", "Selesai"].includes(next)) { const orders = getOrders(); const found = orders.find(x => x.do === o.do); found.status = next; saveOrders(orders); renderOrderTable(); }
      else if (next) alert("Status tidak valid.");
    });
    td.appendChild(edit); tr.appendChild(td); tbody.appendChild(tr);
  });
}
if (byId("orderForm")) {
  populateBookOptions(); renderOrderTable();
  byId("orderForm").addEventListener("submit", e => {
    e.preventDefault(); const fd = new FormData(e.currentTarget), books = getBooks(), book = books.find(b => b.id === fd.get("bookId")), qty = Number(fd.get("qty"));
    if (!book) return alert("Silakan pilih buku terlebih dahulu.");
    if (qty < 1 || qty > book.stock) return alert("Jumlah pesanan melebihi stok yang tersedia.");
    const orders = getOrders(), newOrder = {
      do: "DO-" + new Date().getFullYear() + "-" + String(Date.now()).slice(-5),
      customer: fd.get("customer").trim(), email: fd.get("email").trim(), address: fd.get("address").trim(),
      bookId: book.id, bookTitle: book.title, qty, payment: fd.get("payment"), total: book.price * qty,
      date: new Date().toISOString().slice(0, 10), status: "Diproses", courier: "JNE", package: "Reguler", step: 1
    };
    orders.push(newOrder); saveOrders(orders); book.stock -= qty; saveBooks(books); e.currentTarget.reset(); populateBookOptions(); renderOrderTable();
    alert("Pesanan berhasil dibuat. Nomor DO: " + newOrder.do);
  });
}

// Tracking berdasarkan nomor Delivery Order.
if (byId("trackingForm")) byId("trackingForm").addEventListener("submit", e => {
  e.preventDefault(); const key = byId("doInput").value.trim().toUpperCase(), order = getOrders().find(o => o.do.toUpperCase() === key), target = byId("trackingResult");
  if (!order) { target.innerHTML = '<div class="notice notice-error">Nomor Delivery Order tidak ditemukan. Periksa kembali nomor yang Anda masukkan.</div>'; return; }
  const steps = ["Pesanan dibuat", "Diproses penjual", "Dalam pengiriman", "Pesanan diterima"], active = order.status === "Selesai" ? 4 : order.status === "Dalam Pengiriman" ? 3 : 2;
  target.innerHTML = `<section class="panel tracking-card"><div class="result-head"><div><span class="eyebrow">HASIL PENCARIAN</span><h2>${order.do}</h2></div><span class="status">${order.status}</span></div><h3>Progress Pengiriman</h3><div class="progress-track"><span style="width:${active * 25}%"></span></div><div class="step-list">${steps.map((s,i)=>`<div class="step ${i < active ? "done" : ""}"><span>${i < active ? "✓" : i+1}</span>${s}</div>`).join("")}</div><div class="detail-grid"><div><small>Nama pemesan</small><strong>${escapeHTML(order.customer)}</strong></div><div><small>Ekspedisi</small><strong>${order.courier}</strong></div><div><small>Tanggal kirim</small><strong>${order.date}</strong></div><div><small>Jenis paket</small><strong>${order.package}</strong></div><div><small>Total pembayaran</small><strong>${rupiah(order.total)}</strong></div><div><small>Alamat</small><strong>${escapeHTML(order.address)}</strong></div></div></section>`;
});
function escapeHTML(value) { return String(value).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c])); }

// Laporan dan riwayat transaksi.
function renderSimpleTables() {
  const orders = getOrders();
  if (byId("historyTable")) {
    byId("historyTable").innerHTML = orders.map(o => `<tr><td>${o.do}</td><td>${escapeHTML(o.customer)}</td><td>${escapeHTML(o.bookTitle)}</td><td>${o.date}</td><td>${o.payment}</td><td>${rupiah(o.total)}</td><td><span class="status">${o.status}</span></td></tr>`).join("") || '<tr><td colspan="7" class="empty">Belum ada transaksi.</td></tr>';
  }
  if (byId("reportTable")) {
    byId("reportTable").innerHTML = orders.map(o => `<tr><td>${o.do}</td><td>${escapeHTML(o.customer)}</td><td>${o.date}</td><td>${rupiah(o.total)}</td><td>${o.status}</td></tr>`).join("") || '<tr><td colspan="5" class="empty">Belum ada transaksi.</td></tr>';
    byId("reportOrders").textContent = orders.length;
    byId("reportRevenue").textContent = rupiah(orders.reduce((s,o)=>s+o.total,0));
    byId("reportQty").textContent = orders.reduce((s,o)=>s+o.qty,0);
  }
}
renderSimpleTables();
