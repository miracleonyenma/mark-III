<script setup lang="ts">
import { Bars2Icon, Bars3Icon } from "@heroicons/vue/24/solid/index";
const route = useRoute();
const navActive = ref(false);
const toggleNav = () => {
  navActive.value = !navActive.value;
};

// set up a watcher to deactivate the nav when the route changes
watch(
  () => route.path,
  () => {
    navActive.value = false;
  }
);
</script>
<template>
  <nav class="site-nav" :class="{ active: navActive }">
    <div class="wrapper">
      <ul class="links">
        <li class="link">
          <NuxtLink to="/blog">Blog</NuxtLink>
        </li>
        <li class="link">
          <NuxtLink to="/snippets">Snippets</NuxtLink>
        </li>
        <li class="link">
          <NuxtLink to="/work">Work</NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
  <div class="site-nav-action-cont">
    <button
      @click="toggleNav"
      class="site-nav-btn cta bg-space-cadet-50 dark:bg-space-cadet-900 py-2 shadow-lg"
    >
      <Bars3Icon class="icon w-6 h-6" />
    </button>
  </div>
</template>
<style scoped>
.site-nav {
  @apply fixed top-0 left-0 w-full h-screen bg-space-cadet-50 dark:bg-space-cadet-800 lg:bg-transparent lg:dark:bg-transparent;
  @apply lg:relative lg:w-auto lg:h-auto lg:bg-transparent;

  @apply invisible opacity-0 pointer-events-none;
  @apply lg:visible lg:opacity-100 lg:pointer-events-auto;
}
.site-nav.active {
  @apply visible opacity-100 pointer-events-auto;
}

.site-nav > .wrapper {
  @apply flex flex-col justify-center h-full p-8 py-32;
  @apply flex lg:flex-row lg:h-auto lg:p-0;
}

.links {
  @apply flex flex-col gap-4 text-right;
  @apply lg:flex lg:flex-row lg:gap-4 lg:px-6 lg:text-left;
}

.link {
  @apply font-extrabold text-5xl;
  @apply lg:font-medium lg:text-base;
}

.link > a {
  @apply text-space-cadet-500 hover:text-space-cadet-800 dark:text-space-cadet-400 dark:hover:text-space-cadet-100;
}

.link > a.router-link-active {
  @apply text-space-cadet-800 dark:text-space-cadet-100;
}

.site-nav-action-cont {
  @apply fixed bottom-0 right-0 p-8 pb-14;
  @apply lg:hidden;
}
</style>
