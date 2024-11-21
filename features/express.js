const express = require("express");
const router = express.Router();

// Data fitur untuk respons dinamis
const features = {
  "chat-ai": {
    title: "Chat AI",
    description: "Fitur berbasis kecerdasan buatan untuk membantu pengguna menyelesaikan berbagai tugas secara interaktif dengan pemrosesan bahasa alami (NLP).",
    benefits: [
      "Percakapan interaktif",
      "Pemrosesan bahasa alami",
      "Mendukung multi-tugas",
    ],
  },
  customization: {
    title: "Customization",
    description: "Fitur yang memungkinkan pengguna untuk menyesuaikan pengalaman mereka sesuai kebutuhan pribadi.",
    benefits: [
      "Pengaturan preferensi",
      "Opsi kustomisasi fleksibel",
      "Pengalaman pengguna yang dipersonalisasi",
    ],
  },
  integration: {
    title: "Integration",
    description: "Fitur untuk menghubungkan berbagai platform dan aplikasi untuk fleksibilitas dan efisiensi alur kerja.",
    benefits: [
      "Integrasi aplikasi",
      "Manajemen data yang lebih mudah",
      "Efisiensi kerja",
    ],
  },
  analytics: {
    title: "Analytics",
    description: "Fitur yang membantu Anda memahami data dengan lebih baik untuk pengambilan keputusan yang berbasis data.",
    benefits: [
      "Wawasan mendalam",
      "Laporan berbasis data",
      "Pengambilan keputusan yang lebih baik",
    ],
  },
};

// Endpoint dinamis untuk fitur
router.get("/:feature", (req, res) => {
  const { feature } = req.params;

  if (features[feature]) {
    const { title, description, benefits } = features[feature];
    res.json({
      status: true,
      creator: "Line",
      feature: title,
      description,
      benefits,
    });
  } else {
    res.status(404).json({
      status: false,
      message: `Fitur '${feature}' tidak ditemukan. Silakan periksa nama fitur.`,
    });
  }
});

// Endpoint untuk daftar fitur
router.get("/", (req, res) => {
  const featureList = Object.keys(features).map((key) => ({
    key,
    title: features[key].title,
    description: features[key].description,
  }));
  res.json({
    status: true,
    creator: "Line",
    features: featureList,
  });
});

// Dokumentasi API
router.get("/docs", (req, res) => {
  res.json({
    status: true,
    creator: "Line",
    documentation: {
      routes: [
        {
          method: "GET",
          endpoint: "/api/features",
          description: "Daftar semua fitur.",
        },
        {
          method: "GET",
          endpoint: "/api/features/:feature",
          description: "Detail fitur tertentu berdasarkan parameter.",
          example: "/api/features/chat-ai",
        },
        {
          method: "GET",
          endpoint: "/api/features/docs",
          description: "Dokumentasi API.",
        },
      ],
      note: "Pastikan Anda menggunakan nama fitur yang valid sebagai parameter di endpoint detail fitur.",
    },
  });
});

// Middleware untuk menangani rute yang tidak ada
router.use((req, res) => {
  res.status(404).json({
    status: false,
    message: "Endpoint tidak ditemukan. Silakan periksa kembali URL yang Anda akses.",
  });
});

module.exports = router;
