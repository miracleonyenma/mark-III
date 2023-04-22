<script setup lang="ts">
const { category } = defineProps({
  category: {
    type: String,
  },
});
</script>
<template>
  <header class="page-header work-page-header site-section site-section-header">
    <div class="wrapper">
      <h1 class="pre-title">My work</h1>
      <h2 class="title">Selected projects I've worked on</h2>
      <p class="description">
        Here are some of the projects I've been fortunate to work on. I've also
        included some of my personal projects.
      </p>
    </div>
    <aside class="work-filters wrapper">
      <h3 class="pre-title">Filters</h3>
      <nav class="filter-nav">
        <ul class="filter-list">
          <ContentList
            :path="`/work`"
            :query="{
              only: ['title', '_path', '_id'],
              where: [{ _id: { $contains: 'index' } }],
            }"
          >
            <template v-slot="{ list }">
              <li class="filter-item">
                <NuxtLink to="/work"> All </NuxtLink>
              </li>
              <li v-for="work in list" :key="work._path" class="filter-item">
                <NuxtLink :to="work?._path">{{ work.title }}</NuxtLink>
              </li>
            </template>
          </ContentList>
        </ul>
      </nav>
    </aside>
  </header>
</template>
<style scoped>
.work-page-header {
  @apply flex flex-wrap md:flex-nowrap justify-between gap-12;
}

.work-filters {
  @apply md:w-min;
}

.work-filters .pre-title {
  @apply md:px-3;
}

.filter-list {
  @apply flex flex-col w-max max-w-sm;
}

/* .filter-item {
  @apply ;
} */

.filter-item > a {
  @apply block p-1 px-3 bg-transparent border border-space-cadet-200/0 rounded-3xl;
  /* @apply hover:bg-vivid-indigo-50 hover:text-vivid-indigo-600 hover:border-vivid-indigo-200; */
}

.filter-item > a.router-link-exact-active,
.filter-item > a:hover,
.filter-item > a:focus {
  @apply bg-vivid-indigo-50 text-vivid-indigo-600 border-vivid-indigo-200;
  @apply dark:bg-vivid-indigo-600 dark:text-vivid-indigo-50 dark:border-vivid-indigo-500;
}
</style>
