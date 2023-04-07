<script setup>
import { useMotion } from "@vueuse/motion";
import {
  PhTwitterLogo,
  PhLinkedinLogo,
  PhGithubLogo,
  PhDribbbleLogo,
  PhReadCvLogo,
} from "@phosphor-icons/vue";
const specialGreeting = useSpecialGreeting();

const heroContent = ref();
const heroContentText = ref();

const { variant: heroContentTextVariant } = useMotion(heroContentText, {
  initial: { opacity: 0, y: 20 },
  enterText: { opacity: 1, y: 0 },
});

const heroContentMotionInstance = useMotion(heroContent, {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      onComplete: () => {
        heroContentTextVariant.value = "enterText";
      },
    },
  },
});

const socialLinks = [
  {
    name: "Twitter",
    url: "https://twitter.com/miracleio",
    icon: PhTwitterLogo,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/miracleio",
    icon: PhLinkedinLogo,
  },
  {
    name: "GitHub",
    url: "https://github.com/miracleonyenma",
    icon: PhGithubLogo,
  },

  {
    name: "Dribbble",
    url: "https://dribbble.com/miracleio",
    icon: PhDribbbleLogo,
  },

  {
    name: "My Resume",
    url: "https://docs.google.com/document/d/1jqlXD4OjNMssz_IBJOe7NuKp8uQaYRs5_3XK-6_lf4Y/edit?usp=sharing",
    icon: PhReadCvLogo,
  },
];
</script>
<template>
  <main class="site-main">
    <header class="site-hero">
      <div class="wrapper">
        <div class="img-cont hero-img-cont">
          <img
            src="/assets/img/miracleio.jpg"
            alt="A picture of Miracle Onyenma"
          />
        </div>
        <div ref="heroContent" class="hero-content">
          <span class="py-4" v-if="specialGreeting">
            {{ specialGreeting }}
          </span>

          <h1 class="font-heading font-extrabold text-3xl md:text-6xl mb-2">
            Hey there,
            <br />
            I'm Miracle Onyenma
          </h1>
          <p ref="heroContentText" class="text-lg md:text-2xl">
            I'm a Designer and Frontend Developer obsessed with crafting
            beautiful experiences ✨
          </p>
          <ul class="socials-links group">
            <!-- <NuxtLink to="" -->
            <li
              v-for="(link, index) of socialLinks"
              :key="link.name"
              class="link-item"
              :style="{ transitionDuration: (index + 1) * 0.5 + 's' }"
            >
              <NuxtLink :to="link.url" :target="link.name" :title="link.name" class="social-link">
                <component :is="link.icon" weight="fill" class="icon w-8 h-8" />
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  </main>
</template>
<style scoped>
.site-hero {
  @apply relative p-8 py-24 md:mt-32;
}

.site-hero > .wrapper {
  @apply grid md:grid-cols-2 gap-12 max-w-7xl m-auto;
}

.hero-img-cont {
  @apply md:col-start-3 md:col-span-1 max-w-[14rem] md:max-w-xs;
}

.hero-img-cont > img {
  @apply rounded-full;
  @apply ring-8 ring-blue-ryb dark:ring-han-purple ring-offset-8 ring-offset-space-cadet-50 dark:ring-offset-space-cadet-900;
}

.site-hero .hero-content {
  @apply md:col-span-2 md:col-start-1 md:row-start-1 flex flex-col gap-2 w-full max-w-7xl m-auto;
}

.socials-links {
  @apply flex gap-2 w-fit p-2 border border-space-cadet-200 dark:border-space-cadet-800 rounded-full;
}

.socials-links .link-item {
  @apply inline-block p-3 rounded-full;
  @apply transition-all;
}

.socials-links:hover .link-item {
  @apply bg-space-cadet-200 dark:bg-space-cadet-800;
}

.link-item:hover .icon {
  @apply transition transform scale-110;
}
</style>
