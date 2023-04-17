<script setup lang="ts">
const a = ref(1);
</script>
<template>
  <header class="site-header">
    <slot name="outside-wrapper"></slot>

    <div class="wrapper">
      <NuxtLink to="/">
        <SiteLogo>
          <template #logo-text>
            <h1 class="font-heading font-bold">Miracleio</h1>
          </template>
        </SiteLogo>
      </NuxtLink>
      <div class="content-cont">
        <slot></slot>
      </div>
    </div>
  </header>
</template>
<style scoped>
.site-header {
  @apply sticky lg:fixed top-0 left-0 w-full p-4 z-20;
}

.site-header > .wrapper {
  @apply flex items-center justify-between gap-4 p-3 bg-white lg:bg-white/70 dark:bg-space-cadet-800 lg:dark:bg-space-cadet-800/90  border border-space-cadet-100/70 dark:border-space-cadet-700/70 rounded-full max-w-6xl m-auto;
  @apply lg:backdrop-blur-md bg-clip-padding;
}

.site-header .content-cont {
  @apply flex items-center gap-4;
}
</style>
