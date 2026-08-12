/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Moderne, kleinere Bildformate für die Portfolio-Screenshots etc.
    formats: ["image/avif", "image/webp"],
    // Next 16 verlangt eine Whitelist der genutzten Qualitätsstufen.
    // 75 = Standard (alle übrigen Bilder), 90 = scharfe Portfolio-Screenshots.
    qualities: [75, 90],
  },
};

export default nextConfig;
