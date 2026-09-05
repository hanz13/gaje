# gaje.lol — ini bukan website. tapi cuma isi kepala.

Single-page interactive experimental website yang dibuat abstrak, absurd, sedikit melancholic, dark, mysterious, dan terasa seperti halaman internet pribadi yang ditemukan secara tidak sengaja pada tengah malam (02:37 AM).

## ✨ Fitur Interaktif

- **Random Thought**: Pikiran-pikiran random khas netizen malam hari yang berganti halus secara berkala.
- **Fake Loading**: Indikator "loading perasaan..." yang berjalan absurd antara 20% sampai 89%, tidak pernah sampai 100%, dan sesekali mundur.
- **Subtle Glitch**: Animasi glitch halus pada teks tertentu tanpa mengganggu keterbacaan.
- **Mouse Parallax**: Efek pergeseran kedalaman yang lembut mengikuti pergerakan kursor (khusus desktop).
- **Celestial & Doodle Scribbles**: Coretan tangan SVG (lingkaran orbit angkasa, benang kusut, underline, seismograf, dan koordinat Jakarta).
- **Film Grain & Dust Particles**: Tekstur film grain SVG dan partikel debu melayang yang sangat ringan tanpa library besar.
- **Atmospheric Photo**: Foto moody 35mm yang ditempel dengan selotip frosted tape dan coretan tangan.
- **Ambient Sound & YouTube Music**:
  - Terintegrasi dengan pemutar musik YouTube latar belakang menggunakan lagu pilihan: `https://www.youtube.com/watch?v=zn1q6MRocfQ`.
  - Musik otomatis berputar saat pengunjung membuka halaman dengan toggle dalam posisi default `sound: on`.
  - Saat diubah ke `sound: off`, audio menjadi **silent/bisu namun tetap terus berputar di latar belakang**. Ketika diaktifkan kembali ke `sound: on`, lagu langsung berlanjut tanpa jeda.
  - Tampilan tombol tetap bersih dan minimalis tanpa popup atau tombol tambahan.
- **Easter Eggs**:
  - Klik brand `gaje.lol` berkali-kali untuk memicu respon tersembunyi.
  - Klik area kosong berkali-kali untuk memicu notifikasi `"lu gabut ya?"`.
  - Klik respon perasaan `"entahlah."` untuk mengganti emosi.

## 🖼️ Mengganti Foto Mood

Foto yang ditampilkan di sisi kanan disimpan secara lokal pada:
```
public/images/mood.jpg
```
Anda dapat mengganti file tersebut kapan saja dengan foto apa pun yang bertema moody/melancholic/35mm.

## 🚀 Menjalankan Project Secara Lokal

Install dependensi:
```bash
npm install
```

Jalankan development server:
```bash
npm run dev
```
Buka browser di `http://localhost:3000`.

Build untuk production:
```bash
npm run build
```

Jalankan preview production:
```bash
npm start
```

## ☁️ Deploy ke Vercel

Project ini 100% client-side tanpa database atau server backend, sehingga siap di-deploy langsung ke Vercel:
1. Push repository ke GitHub.
2. Buka dashboard Vercel, pilih **Import Git Repository**.
3. Framework Preset akan otomatis terdeteksi sebagai **Vite**.
4. Klik **Deploy**.
