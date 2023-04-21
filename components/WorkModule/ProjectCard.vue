<script setup lang="ts">
const { work } = defineProps<{
  work: {
    coverImage: string;
    title: string;
    description: string;
  };
}>();
</script>
<template>
  <article class="project-card">
    <div class="wrapper">
      <header class="project-card-header">
        <figure class="img-cont">
          <img :src="work.coverImage" />
        </figure>
        <div class="details">
          <h3 class="title">{{ work.title }}</h3>
          <p class="description">
            {{ work.description }}
          </p>
        </div>
      </header>
    </div>
  </article>
</template>
<style scoped>
.project-card {
  @apply border border-space-cadet-200 dark:border-space-cadet-700 rounded-3xl;
  /* @apply border border-vivid-indigo-200 dark:border-vivid-indigo-600 rounded-3xl; */
}

.project-card > .wrapper {
  @apply relative;
}

.project-card .img-cont {
  @apply absolute h-full rounded-3xl;
  @apply w-full rounded-t-3xl  overflow-hidden;
  /* @apply h-64; */
}

.project-card .details {
  @apply relative p-4 pt-64 rounded-b-3xl;
  @apply bg-gradient-to-t from-white/90 dark:from-space-cadet-900/90 via-space-cadet-50/50  dark:via-space-cadet-800/50 to-space-cadet-100/0 dark:to-space-cadet-700/0;
  /* @apply bg-gradient-to-t from-vivid-indigo-300/90 dark:from-vivid-indigo/90 via-vivid-indigo-100/50  dark:via-vivid-indigo-600/50 to-vivid-indigo-50/0 dark:to-vivid-indigo-900/0; */
}

.project-card .title {
  @apply font-semibold uppercase;
}

.project-card .description {
  @apply text-2xl font-bold font-heading;
}
</style>
