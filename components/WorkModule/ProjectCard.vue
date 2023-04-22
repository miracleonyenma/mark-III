<script setup lang="ts">
const { work } = defineProps<{
  work: {
    coverBg: string;
    cover: string;
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
          <img
            v-if="work.cover"
            :src="work.coverBg"
            class="cover-bg-img"
            alt=""
          />
          <img v-else :src="work.coverImage" class="cover-bg-img" />
          <img v-if="work.cover" :src="work.cover" class="cover-img" alt="" />
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
  @apply h-full border border-space-cadet-200 dark:border-space-cadet-700 rounded-3xl;
  /* @apply border border-vivid-indigo-200 dark:border-vivid-indigo-600 rounded-3xl; */
}

.project-card:hover .cover-img,
.project-card:focus .cover-img {
  @apply transform scale-105 rotate-1;
}

.project-card:hover .cover-bg-img,
.project-card:focus .cover-bg-img {
  @apply transform scale-[.98];
}

.project-card > .wrapper {
  @apply relative h-full;
}

.project-card-header {
  @apply flex flex-col h-full;
}

.project-card .img-cont {
  /* @apply absolute h-full rounded-3xl; */
  @apply relative grow p-4 w-full;
  /* @apply h-64; */
}

.project-card .img-cont img {
  @apply transition;
}

.project-card .img-cont .cover-bg-img {
  @apply rounded-xl;
}

.project-card .cover-img {
  @apply absolute top-0 -left-8 w-[calc(100%+4rem)] object-contain max-w-none;
}

.project-card .details {
  @apply relative self-end p-4  rounded-b-3xl;
  /* @apply pt-64; */
  /* @apply bg-gradient-to-t from-white/90 dark:from-space-cadet-900/90 via-space-cadet-50/60  dark:via-space-cadet-800/60 to-space-cadet-100/0 dark:to-space-cadet-700/0; */
  /* @apply bg-gradient-to-t from-vivid-indigo-300/90 dark:from-vivid-indigo/90 via-vivid-indigo-100/50  dark:via-vivid-indigo-600/50 to-vivid-indigo-50/0 dark:to-vivid-indigo-900/0; */
}

.project-card .title {
  @apply font-semibold uppercase;
}

.project-card .description {
  @apply text-2xl font-bold font-heading;
}
</style>
