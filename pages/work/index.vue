<script setup>
const route = useRoute();
</script>

<template>
  <main class="site-main">
    <header
      class="page-header work-page-header site-section site-section-header"
    >
      <div class="wrapper">
        <h1 class="pre-title">My work</h1>
        <h2 class="title">Selected projects I've worked on</h2>
        <p class="description">
          Here are some of the projects I've been fortunate to work on. I've
          also included some of my personal projects.
        </p>
      </div>
      <aside class="work-filters">
        <h3 class="pre-title px-3">Filters</h3>
        <nav class="filter-nav">
          <ul class="filter-list">
            <ContentList
              path="/work"
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
    <section class="site-section">
      <div class="wrapper">
        <ul class="project-list">
          <ContentList
            path="/work"
            :query="{
              only: ['title', '_path', '_id', 'description', 'coverImage'],
              where: [{ _id: { $not: { $contains: 'index' } } }],
            }"
          >
            <template v-slot="{ list }">
              <li v-for="work in list" :key="work._path" class="project-item">
                <NuxtLink :to="work?._path">
                  <article class="project-card">
                    <div class="wrapper">
                      <header class="project-card-header">
                        <figure class="img-cont">
                          <NuxtImg :src="work?.coverImage" />
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
                </NuxtLink>
              </li>
            </template>
          </ContentList>
        </ul>
      </div>
    </section>
  </main>
  <!-- <ContentList :path="'/works'" -->
</template>
<style scoped>
.work-page-header {
  @apply flex justify-between gap-4;
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

.project-list {
  @apply flex flex-wrap gap-4;
}

.project-item {
  @apply w-full md:w-1/2 lg:w-[calc(((1/3)*100%)-0.66568855rem)] mt-0 border border-space-cadet-200 dark:border-space-cadet-700 overflow-hidden rounded-3xl;
}

.project-item:nth-of-type(3n + 2) {
  @apply lg:-mt-8 lg:mb-8;
}
/* .project-item {
  @apply border border-b-0 border-space-cadet-400 dark:border-space-cadet-700 overflow-hidden rounded-b-none;
  @apply md:border-l-0;
}
.project-item:first-of-type {
  @apply border-l rounded-t-3xl;
  @apply md:rounded-tr-none;
}

.project-item:nth-of-type(2n) {
  @apply md:rounded-tr-3xl;
  @apply lg:rounded-tr-none;
}

.project-item:nth-last-of-type(2) {
  @apply border-b border-l;
  @apply md:rounded-bl-3xl;
}

.project-item:last-of-type {
  @apply border-b rounded-b-3xl;
  @apply md:rounded-none md:rounded-br-3xl;
} */

.project-card {
  @apply relative;
}

.project-card .img-cont {
  @apply absolute;
  @apply w-full h-full  overflow-hidden;
}

.project-card .details {
  @apply relative p-4 pt-64;
  @apply bg-gradient-to-t from-white dark:from-space-cadet-900 via-space-cadet-50/70  dark:via-space-cadet-800/70 to-space-cadet-100/20 dark:to-space-cadet-700/20;
}

.project-card .title {
  @apply font-semibold uppercase;
}

.project-card .description {
  @apply text-2xl font-bold font-heading;
}
</style>
