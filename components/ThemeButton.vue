<script setup lang="ts">
import {
  SunIcon,
  MoonIcon,
  AcademicCapIcon,
  Bars2Icon,
} from "@heroicons/vue/24/solid/index";

const siteThemeCookie = useCookie("site-theme");
const theme = useSiteTheme();
const setTheme = useSetSiteTheme;

// function to toggle theme
const toggleTheme = () => {
  document.documentElement.classList.remove("dark", "light");
  const setValues = (theme: string) => {
    document.documentElement.classList.add(theme);
    siteThemeCookie.value = theme;
    setTheme(theme);
  };
  if (theme.value === "dark") {
    setValues("light");
  } else {
    setValues("dark");
  }
};
</script>
<template>
  <button class="theme-btn cta" @click="toggleTheme">
    <span v-if="theme === 'dark'">
      <MoonIcon class="icon" />
    </span>
    <span v-else>
      <SunIcon class="icon" />
    </span>
  </button>
</template>
<style scoped>
.theme-btn {
  @apply relative py-2 !bg-white/10 dark:!bg-space-cadet-800/10 z-20;
}
</style>