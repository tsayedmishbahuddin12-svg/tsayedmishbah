# Portfolio — T. Sayed Mishbahuddin Putra Nisa

Website portofolio pribadi yang modern, profesional, dan responsif.

## Struktur Folder

```
portfolio/
├── index.html              ← File utama website
├── css/
│   └── style.css           ← Stylesheet utama
├── js/
│   └── script.js           ← JavaScript utama
├── images/
│   ├── profile.jpg         ← Foto profil (ganti dengan foto Anda)
│   ├── gallery/            ← Folder gambar gallery
│   └── projects/
│       ├── simpuldata.png
│       ├── sihanpangan851.png
│       ├── arsip.png
│       └── sidik.png
├── assets/
│   └── cv/
│       └── CV.pdf          ← File CV Anda (ganti dengan CV terbaru)
└── README.md
```

## Cara Penggunaan

### 1. Mengganti Foto Profil
Ganti file `images/profile.jpg` dengan foto Anda.

### 2. Mengganti CV
Ganti file `assets/cv/CV.pdf` dengan CV terbaru Anda.

### 3. Mengganti Screenshot Project
Ganti file di `images/projects/`:
- `simpuldata.png`
- `sihanpangan851.png`
- `arsip.png`
- `sidik.png`

### 4. Menambahkan Gambar Gallery
Tambahkan gambar ke folder `images/gallery/`,
lalu tambahkan item baru di section Gallery pada `index.html`:
```html
<div class="gallery-item" data-aos="zoom-in">
  <img src="images/gallery/namafile.png" alt="Deskripsi" loading="lazy" />
  <div class="gallery-overlay">
    <i class="fa-solid fa-magnifying-glass-plus"></i>
    <span>Judul Gambar</span>
  </div>
</div>
```

### 5. Menambahkan Link GitHub / LinkedIn
Perbarui URL di bagian Contact dan Footer di `index.html`.

## Teknologi

- HTML5 + Semantic markup
- CSS3 (Custom Properties, Flexbox, Grid)
- JavaScript ES6+
- Bootstrap 5.3
- AOS (Animate On Scroll)
- Font Awesome 6
- Google Fonts (Poppins)

## Hosting

Website ini adalah file statis dan dapat di-hosting di:
- GitHub Pages
- Netlify
- Vercel
- cPanel / Hosting biasa

Cukup upload seluruh isi folder `portfolio/` ke hosting Anda.
