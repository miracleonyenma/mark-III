// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  content: {
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: "dracula",
      },
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // image: {
  //   dir: "assets/img",
  // },
  modules: [
    "@nuxt/content",
    "@vueuse/motion/nuxt",
    "@nuxt/image-edge",
    "@nuxthq/studio",
    "@vue-email/nuxt",
  ],
  extends: ["nuxt-umami"],
});
