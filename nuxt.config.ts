/*
 * Nuxt 3 Config File
 Usage: https://nuxt.com/docs/api/configuration/nuxt-config
 */
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#010C15" },
      ],
      link: [
        { rel: "manifest", href: "pwa/manifest.json" },
        { rel: "apple-touch-icon", href: "pwa/icons/apple-touch-icon.png" },
      ],
    },
  },

  modules: [
   "@nuxtjs/tailwindcss",
   "@nuxt/content",
   "@vueuse/nuxt",
   "@vueuse/motion/nuxt",
   "@nuxtjs/turnstile",
   "@nuxtjs/seo",
   "@nuxtjs/robots",
   "@nuxtjs/sitemap",
  ],
  tailwindcss: {
    cssPath: ["~/assets/tailwind.css", { injectPosition: 0 }],
    configPath: "tailwind.config",
    exposeConfig: true,
    viewer: false,
  },
  turnstile: {
    secretKey: import.meta.env.TURNSTILE_SECRET_KEY,
    siteKey: import.meta.env.TURNSTILE_SITE_KEY,
    addValidateEndpoint: true,
  },
  site: {
    url: `https://${import.meta.env.APP_DOMAIN}`,
    name: "Portfolio Federico David",
    description:
      "Welcome to my portfolio, I am developer web passionate about technology",
    defaultLocale: "en",
  },
  runtimeConfig: {
    email: {
      host: import.meta.env.SMTP_EMAIL_HOST,
      port: import.meta.env.SMTP_EMAIL_PORT,
      user: import.meta.env.SMTP_EMAIL_USER,
      pass: import.meta.env.SMTP_EMAIL_PASS,
      security: import.meta.env.SMTP_EMAIL_SECURITY,
      email_from: import.meta.env.SMTP_EMAIL_FROM,
      email_to: import.meta.env.SMTP_EMAIL_TO,
    },
    public: {
      app_domain: import.meta.env.APP_DOMAIN,
      turnsitle: import.meta.env.TURNSTILE_SITE_KEY,
    },
  },
  compatibilityDate: "2024-08-26",
});