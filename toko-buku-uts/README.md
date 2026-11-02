# LAPORAN PENGERJAAN UTS PEMROGRAMAN WEB 1

## Aplikasi Pemesanan Buku Online — BukuKita

**Nama:** ....................................................  
**NIM:** ....................................................  
**Kelas:** ....................................................  
**Mata Kuliah:** Pemrograman Web 1  
**Dosen Pengampu:** ....................................................  
**Tahun Akademik:** 2026

---

## 1. Pendahuluan

BukuKita merupakan aplikasi web front-end sederhana untuk membantu pengelolaan toko buku online. Aplikasi ini dibuat sebagai pengerjaan Ujian Tengah Semester (UTS) mata kuliah Pemrograman Web 1.

Pengerjaan berfokus pada penerapan HTML untuk membangun struktur halaman, CSS untuk mengatur tampilan antarmuka, serta JavaScript untuk mengelola data dan interaksi pengguna. Sesuai ketentuan tugas, data yang digunakan merupakan data dummy dari file JavaScript terpisah dan bukan berasal dari server atau database.

## 2. Tujuan Pengerjaan

Tujuan pengerjaan aplikasi BukuKita adalah:

1. Menerapkan struktur HTML yang semantik, valid, dan terorganisasi.
2. Mengatur tampilan antarmuka menggunakan CSS inline, internal, dan external.
3. Menggunakan JavaScript untuk manipulasi DOM dan data pada tabel.
4. Menerapkan validasi form serta memberikan feedback melalui alert atau pesan antarmuka.
5. Membuat interaksi pengguna seperti modal dan navigasi ant halaman.
6. Menyusun file project secara modular agar mudah dibaca dan dikembangkan.

## 3. Deskripsi Aplikasi

BukuKita adalah simulasi aplikasi administrasi toko buku. Pengguna dapat masuk melalui halaman login, melihat ringkasan pada dashboard, mengelola katalog dan stok buku, membuat pesanan, memeriksa status pengiriman, serta melihat laporan dan riwayat transaksi.

Aplikasi ini ditujukan untuk demonstrasi proses front-end. Data awal disimpan dalam array objek JavaScript pada `js/data.js`. Perubahan data pada browser dipertahankan menggunakan `localStorage`.

## 4. Struktur Folder Project

```text
toko-buku-uts/
│
├── index.html              # Halaman login
├── dashboard.html          # Dashboard dan ringkasan
├── stok.html               # Katalog dan informasi stok buku
├── checkout.html           # Form pemesanan buku
├── tracking.html           # Pencarian status pengiriman
├── laporan.html            # Ringkasan laporan pemesanan
├── riwayat.html             # Riwayat transaksi
│
├── css/
│   └── style.css           # Pengaturan tampilan aplikasi
│
├── js/
│   ├── data.js             # Data dummy katalog dan transaksi
│   └── script.js           # Logika aplikasi dan manipulasi DOM
│
├── img/
│   ├── buku1.png           # Sampul Laskar Pelangi
│   ├── buku2.png           # Sampul Bumi
│   ├── buku3.png           # Sampul Atomic Habits
│   ├── buku4.png           # Sampul Filosofi Teras
│   └── buku5.png           # Sampul Negeri 5 Menara
│
├── README.md               # Laporan pengerjaan project
└── NASKAH-VIDEO.md         # Naskah penjelasan video
```

## 5. Teknologi yang Digunakan

| Teknologi | Penerapan |
|---|---|
| HTML5 | Membuat struktur dan elemen setiap halaman |
| CSS3 | Mengatur warna, tipografi, layout, tabel, form, dan responsivitas |
| JavaScript | Mengelola data, event, validasi, dan interaksi |
| DOM | Membuat serta memperbarui elemen HTML secara dinamis |
| LocalStorage | Menyimpan perubahan data pada browser |
| PNG | Menyimpan gambar sampul buku pada folder `img` |

## 6. Implementasi Fitur

### 6.1 Halaman Login (`index.html`)

Halaman login menyediakan input email dan password serta tombol Login. JavaScript memeriksa kecocokan data login. Jika data tidak sesuai, aplikasi menampilkan alert kesalahan. Tersedia pula tampilan modal untuk fitur Lupa Password dan Daftar yang disimulasikan pada sisi front-end.

Akun demo:
- Email: `admin@bukukita.com`
- Password: `admin123`

### 6.2 Dashboard (`dashboard.html`)

Dashboard menjadi halaman utama setelah pengguna login. Halaman ini menyediakan navigasi menuju katalog, pemesanan, tracking, laporan, dan riwayat transaksi. Greeting ditentukan berdasarkan waktu lokal perangkat. Dashboard juga menampilkan ringkasan jumlah buku, jumlah pesanan, total stok, dan pesanan yang sedang dikirim.

### 6.3 Informasi Stok/Katalog (`stok.html`)

Data katalog ditampilkan secara dinamis dari konstanta `dataKatalogBuku` yang berada di `js/data.js`. JavaScript membuat baris tabel menggunakan manipulasi DOM. Halaman ini menyediakan pencarian buku, penambahan data buku melalui form/modal, dan penghapusan data.

Setiap data buku memiliki properti gambar yang mengarah ke file pada folder `img`. Dengan demikian, sampul yang ditampilkan mengikuti data buku masing-masing.

### 6.4 Pemesanan (`checkout.html`)

Halaman pemesanan menyediakan form informasi pemesan dan pembayaran. Pilihan buku diambil dari data katalog. Form memeriksa kelengkapan input dan ketersediaan stok. Jika data valid, aplikasi membuat nomor Delivery Order, menghitung total pembayaran, menyimpan transaksi, dan memperbarui stok sesuai jumlah pesanan.

### 6.5 Tracking Pengiriman (`tracking.html`)

Pengguna memasukkan nomor Delivery Order untuk mencari transaksi. Jika nomor ditemukan, aplikasi menampilkan nama pemesan, status pengiriman, detail ekspedisi, tanggal kirim, jenis paket, total pembayaran, dan progres pengiriman. Jika nomor tidak ditemukan, aplikasi memberikan pesan bahwa data tidak tersedia.

### 6.6 Laporan Pemesanan (`laporan.html`)

Halaman laporan menampilkan ringkasan data transaksi, seperti jumlah transaksi, total pendapatan, dan jumlah buku yang terjual berdasarkan data transaksi yang tersimpan.

### 6.7 Riwayat Transaksi (`riwayat.html`)

Halaman riwayat menampilkan daftar transaksi yang pernah dibuat. Data riwayat menggunakan sumber data transaksi yang sama dengan halaman pemesanan dan laporan.

## 7. Penerapan HTML, CSS, dan JavaScript

### 7.1 HTML

HTML digunakan untuk membangun struktur halaman, antara lain elemen navigasi, header, main content, form, tabel, tombol, dan modal. Struktur halaman dipisahkan ke dalam beberapa file HTML agar setiap fitur memiliki halaman tersendiri.

### 7.2 CSS

Pengaturan tampilan utama ditempatkan pada file eksternal `css/style.css`. Project juga menerapkan penggunaan CSS internal dan inline sebagai bagian dari indikator tugas. Desain menggunakan sidebar, panel konten, tabel, kartu ringkasan, form, serta penyesuaian tampilan untuk ukuran layar yang berbeda.

### 7.3 JavaScript dan DOM

JavaScript ditempatkan pada folder `js`. File `data.js` berisi data dummy dalam bentuk array objek, sedangkan `script.js` menangani logika aplikasi. Manipulasi DOM digunakan untuk menampilkan data katalog, menambah dan menghapus baris tabel, memperbarui pilihan buku, serta menampilkan hasil pencarian tracking.

### 7.4 Validasi dan Feedback

Validasi dilakukan pada form login dan pemesanan. Aplikasi memberikan feedback ketika input tidak sesuai, data wajib belum diisi, stok tidak mencukupi, atau nomor Delivery Order tidak ditemukan. Modal digunakan untuk interaksi seperti Lupa Password, Daftar, dan penambahan buku.

## 8. Alur Penggunaan Aplikasi

1. Pengguna membuka halaman login.
2. Pengguna memasukkan akun demo untuk masuk ke dashboard.
3. Pengguna melihat ringkasan dan memilih menu yang diperlukan.
4. Pada menu Informasi Stok, pengguna dapat mencari, menambah, atau menghapus data buku.
5. Pada menu Pemesanan, pengguna mengisi informasi pemesan, memilih buku, menentukan jumlah, dan metode pembayaran.
6. Setelah pesanan berhasil dibuat, aplikasi menghasilkan nomor Delivery Order.
7. Nomor Delivery Order digunakan pada halaman Tracking untuk melihat status pengiriman.
8. Data pesanan dapat dilihat kembali pada halaman Laporan dan Riwayat Transaksi.

## 9. Pengujian Fitur

Pengujian berikut dapat dilakukan secara manual melalui browser:

| No. | Fitur | Skenario Pengujian | Hasil yang Diharapkan |
|---:|---|---|---|
| 1 | Login | Memasukkan akun yang benar | Berhasil menuju dashboard |
| 2 | Login | Memasukkan email/password salah | Muncul alert kesalahan |
| 3 | Modal login | Menekan Lupa Password atau Daftar | Modal ditampilkan |
| 4 | Dashboard | Membuka dashboard pada waktu berbeda | Greeting menyesuaikan waktu lokal |
| 5 | Katalog | Membuka halaman Informasi Stok | Data buku tampil dari array JavaScript |
| 6 | Pencarian | Memasukkan judul atau penulis | Tabel menampilkan data yang cocok |
| 7 | Tambah buku | Mengisi form buku dengan benar | Baris buku baru ditampilkan |
| 8 | Hapus buku | Menekan tombol Hapus dan menyetujui konfirmasi | Data buku dihapus dari katalog |
| 9 | Pemesanan | Mengisi form dengan data valid | Pesanan tersimpan dan nomor DO dibuat |
| 10 | Validasi stok | Memesan melebihi stok | Sistem menolak pesanan dan memberi feedback |
| 11 | Tracking | Memasukkan nomor DO yang tersedia | Detail dan status pengiriman ditampilkan |
| 12 | Tracking | Memasukkan nomor DO yang tidak tersedia | Pesan data tidak ditemukan ditampilkan |
| 13 | Laporan | Membuka halaman laporan setelah transaksi dibuat | Ringkasan transaksi ditampilkan |
| 14 | Riwayat | Membuka halaman riwayat | Data transaksi ditampilkan |

**Catatan:** Tabel ini merupakan skenario pengujian manual yang disiapkan untuk pemeriksaan. Beri tanda atau catatan hasil aktual setelah setiap skenario benar-benar dicoba pada browser.

## 10. Penyimpanan Data dan Batasan Aplikasi

Aplikasi tidak menggunakan backend maupun database server. Data awal disediakan melalui array objek JavaScript. `localStorage` digunakan untuk menyimpan perubahan data pada browser yang sedang digunakan.

Karena berbasis front-end, data tidak otomatis tersinkronisasi ke perangkat atau browser lain. Fitur login, pendaftaran, dan lupa password merupakan simulasi untuk kebutuhan pembelajaran, bukan sistem autentikasi produksi.

## 11. Kesimpulan

Berdasarkan pengerjaan project, aplikasi BukuKita menjadi implementasi sederhana pemesanan dan pengelolaan toko buku online menggunakan HTML, CSS, dan JavaScript. Aplikasi memiliki halaman login, dashboard, katalog, pemesanan, tracking, laporan, dan riwayat transaksi.

Pengerjaan ini menerapkan pemisahan file, penggunaan data dummy dari JavaScript, manipulasi DOM, validasi form, feedback kepada pengguna, modal, serta penyimpanan data lokal melalui `localStorage`. Project masih berfokus pada front-end dan dapat dikembangkan lebih lanjut dengan backend serta database apabila diperlukan.

## 12. Dokumentasi Video Penjelasan

Video penjelasan dibuat dengan durasi maksimal **15 menit** sesuai petunjuk UTS. Isi video disarankan mencakup:

1. Perkenalan aplikasi dan tujuan pembuatannya.
2. Penjelasan struktur folder dan pemisahan file.
3. Demonstrasi login berhasil dan login gagal.
4. Penjelasan dashboard dan greeting berdasarkan waktu lokal.
5. Demonstrasi pencarian, penambahan, dan penghapusan buku.
6. Demonstrasi pemesanan serta validasi form.
7. Demonstrasi pencarian nomor Delivery Order pada tracking.
8. Penjelasan laporan dan riwayat transaksi.
9. Penjelasan penerapan HTML, CSS, JavaScript, DOM, dan `localStorage`.
10. Kesimpulan serta batasan aplikasi.

---

**Dokumen ini merupakan laporan pengerjaan project UTS Pemrograman Web 1 untuk aplikasi BukuKita.**
