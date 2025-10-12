// Konfigurasi GitHub
export const GITHUB_CONFIG = {
  // Ganti dengan username GitHub Anda
  USERNAME: "SamVivan1",

  // GitHub Personal Access Token (opsional, untuk menghindari rate limit)
  // Dapatkan dari: https://github.com/settings/tokens
  // Scope yang diperlukan: public_repo
  TOKEN: process.env.NEXT_PUBLIC_GITHUB_TOKEN || "",

  // Jumlah repository yang akan ditampilkan
  REPOS_PER_PAGE: 7,

  // Repository yang akan di-exclude (tidak ditampilkan)
  EXCLUDE_REPOS: [
    "SamVivan1", // Repository dengan nama yang sama dengan username
    "README", // Repository README
  ],

  // Repository yang akan di-prioritaskan (ditampilkan di atas)
  PRIORITY_REPOS: [
    "portfolio",
    "homelab-control",
    "media-library",
    "monitoring-api",
  ],
};
