<script setup>
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CommandLineIcon,
  PencilIcon,
  SwatchIcon,
} from "@heroicons/vue/24/solid";
import { useMotion } from "@vueuse/motion";
// import {
//   PhTwitterLogo,
//   PhLinkedinLogo,
//   PhGithubLogo,
//   PhDribbbleLogo,
//   PhReadCvLogo,
// } from "@phosphor-icons/vue";
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
    // icon: PhTwitterLogo,
    text: "TW",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/miracleio",
    // icon: PhLinkedinLogo,
    text: "LN",
  },
  {
    name: "GitHub",
    url: "https://github.com/miracleonyenma",
    // icon: PhGithubLogo,
    text: "GH",
  },

  {
    name: "Dribbble",
    url: "https://dribbble.com/miracleio",
    // icon: PhDribbbleLogo,
    text: "DR",
  },

  {
    name: "My Resume",
    url: "https://docs.google.com/document/d/1jqlXD4OjNMssz_IBJOe7NuKp8uQaYRs5_3XK-6_lf4Y/edit?usp=sharing",
    // icon: PhReadCvLogo,
    text: "CV",
  },
];

const workCategories = [
  {
    name: "Development",
    description:
      "While I mostly work on front end projects I also build fullstack applications using the best tools at my disposal.",
  },
  {
    name: "Design",
    description:
      "While I mostly work on front end projects I also build fullstack applications using the best tools at my disposal.",
  },
  {
    name: "Writing",
    description:
      "While I mostly work on front end projects I also build fullstack applications using the best tools at my disposal.",
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
              <NuxtLink
                :to="link.url"
                :target="link.name"
                :title="link.name"
                class="social-link"
              >
                <!-- <component :is="link.icon" weight="fill" class="icon w-8 h-8" /> -->
                <span>{{ link.text }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="site-section work-section">
      <div class="wrapper">
        <header class="site-section-header">
          <div class="wrapper">
            <h2 class="pre-title">My Work</h2>
            <h3 class="title">What I do</h3>
            <p class="text">Here are the major areas my work spans across</p>
          </div>
        </header>

        <ContentList
          path="/work"
          :query="{
            only: ['title', 'description', '_path', '_id'],
            where: [{ _id: { $contains: 'index' } }],
          }"
        >
          <!-- Default list slot -->
          <template v-slot="{ list }">
            <ul class="work-category-list">
              <li
                v-for="work in list"
                :key="work._path"
                class="work-category-item"
              >
                <NuxtLink :to="work._path">
                  <article class="work-category">
                    <header class="work-category-heading">
                      <div class="icon-cont mb-4">
                        <SwatchIcon
                          v-if="work.title == 'Design'"
                          class="icon !w-12 !h-12"
                        />
                        <CommandLineIcon
                          v-else-if="work.title == 'Development'"
                          class="icon !w-12 !h-12"
                        />
                        <PencilIcon
                          v-else-if="work.title == 'Technical Writing'"
                          class="icon !w-12 !h-12"
                        />
                      </div>
                      <h3 class="caption">{{ work?.title }}</h3>
                      <p class="description">
                        {{ work?.description }}
                      </p>
                    </header>
                    <footer class="work-category-footer">
                      <button class="flex justify-between w-full">
                        <span class="text"> More </span>
                        <ArrowUpRightIcon class="icon w-6 h-6" />
                      </button>
                    </footer>
                  </article>
                </NuxtLink>
              </li>
            </ul>
          </template>
        </ContentList>
      </div>
    </div>
  </main>
</template>
<style scoped>
.site-hero {
  @apply relative p-8 py-24 md:mt-24;
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

.socials-links .link-item:has(span) {
  @apply flex items-center justify-center w-12 h-12;
}

.socials-links:hover .link-item {
  @apply bg-space-cadet-200 dark:bg-space-cadet-800;
}

.link-item:hover .icon {
  @apply transition transform scale-110;
}

/* WORK SECTION */
.work-section {
}

.work-category-list {
  @apply grid lg:grid-cols-3 gap-0;
}

/* .work-category-item {
  @apply border-x border-b  first-of-type:border typ:border-b border-space-cadet-200;
  @apply lg:border-x-0 lg:border-y;
} */

.work-category-item {
  @apply border-space-cadet-200 dark:border-space-cadet-800 border-x border-t overflow-hidden;
  @apply lg:border-l lg:border-y lg:border-r-0;
}

.work-category-item:first-of-type {
  @apply border border-b-0 rounded-t-3xl;
  @apply lg:border-b lg:border-r-0 lg:rounded-l-3xl lg:rounded-r-none;
}

.work-category-item:nth-of-type(n + 3) {
  @apply border-b border-t rounded-b-3xl;
  @apply lg:border lg:rounded-l-none lg:rounded-r-3xl;
}

.work-category {
  @apply flex flex-col justify-between gap-8 h-full p-6 bg-white dark:bg-space-cadet-900;
  @apply hover:bg-space-cadet-50 dark:hover:bg-space-cadet-800;
}

.work-category-heading {
  @apply flex flex-col gap-2;
}

.work-category .caption {
  @apply font-heading font-semibold text-2xl;
}
</style>
