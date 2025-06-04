// https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   compatibilityDate: '2025-05-15',
//   devtools: { enabled: true }
// })
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2025-06-03",
  devtools: { enabled: true },

  // Modules
  modules: [
    [
      "@nuxtjs/i18n",
      {
        locales: [
          { code: "mn", iso: "mn-MN", name: "Монгол", file: "mn.json" },
          { code: "en", iso: "en-US", name: "English", file: "en.json" },
        ],
        lazy: true,
        langDir: "locales/",
        defaultLocale: "mn",
        strategy: "prefix_except_default",
        experimental: {
          optimizeTranslationDirective: false, // эсвэл true, гэхдээ заавал зааж өг
        },
        bundle: {
          optimizeTranslationDirective: false,
        },
      },
    ],
    "@pinia/nuxt",
    "@vueuse/nuxt",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Roboto: [300, 400, 500, 700],
          Inter: [300, 400, 500, 600, 700],
        },
      },
    ],
    "@nuxtjs/tailwindcss",
  ],

  tailwindcss: {
    cssPath: [`./assets/css/tailwind.css`, { injectPosition: "first" }],
    config: {},
    viewer: true,
    exposeConfig: false,
  },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // App configuration
  app: {
    baseURL: "https://github.com/Dorjnyam/dayan-hotel",
    head: {
      title: "Даян зочид буудал - Улиастай, Завхан",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Завхан аймгийн Улиастай хотын тэргүүлэх зочид буудал. Орчин үеийн тав тухтай өрөө, үйлчилгээ.",
        },
        {
          name: "keywords",
          content: "зочид буудал, Улиастай, Завхан, Монгол, аялал жуулчлал",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  // Runtime config
  runtimeConfig: {
    // Private keys (only available on server-side)
    jwtSecret: process.env.JWT_SECRET || "your-secret-key",
    databaseUrl: process.env.DATABASE_URL,

    // Public keys (exposed to client-side)
    public: {
      apiBase: process.env.API_BASE_URL || "http://localhost:3000/api",
      hotelName: "Даян зочид буудал",
      hotelPhone: "+976-70123456",
      hotelEmail: "info@dayanhotel.mn",
    },
  },

  // Server-side rendering
  ssr: true,

  // Build configuration
  build: {
    transpile: ["@headlessui/vue"],
  },

  nitro: {
    esbuild: {
      options: {
        target: "es2020",
      },
    },
    prerender: {
      routes: ["/"], // explicitly prerender only /
      ignore: ["/200.html", "/404.html"], // prevent errors
    },
  },
});
