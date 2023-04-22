<script setup lang="ts">
import { ParsedContent } from "@nuxt/content/dist/runtime/types";

const { category } = defineProps<{
  category?: Pick<ParsedContent, string> | null;
}>();
useHead({
  title: category?.title || "My work",
  meta: [
    {
      name: "description",
      content: category?.description || "Selected projects I've worked on",
      key: "description",
    },
    //Open Graph
    {
      key: "og-type",
      property: "og:type",
      content: "website",
    },
    {
      key: "og-url",
      property: "og:url",
      content: `https://v3.miracleio.me${category?._path}`,
    },
    {
      key: "og-title",
      property: "og:title",
      content: category?.title,
    },
    {
      key: "og-description",
      property: "og:description",
      content: category?.description,
    },
    {
      key: "og-image",
      property: "og:image",
      content: `https://v3.miracleio.me${category?.coverImage}`,
    },
    //Twitter
    {
      key: "twitter-card",
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      key: "twitter-url",
      property: "twitter:url",
      content: `https://miracleio.me${category?._path}`,
    },
    {
      key: "twitter-title",
      property: "twitter:title",
      content: category?.title,
    },
    {
      key: "twitter-description",
      property: "twitter:description",
      content: category?.description,
    },
    {
      key: "twitter-image",
      property: "twitter:image",
      content: `https://v3.miracleio.me${category?.coverImage}`,
    },
  ],
});

console.log({
  category,
});
</script>
<template>
  <header class="page-header work-page-header site-section site-section-header">
    <div class="wrapper">
      <section class="work-page-header-content">
        <h1 class="pre-title">My work</h1>
        <h2 class="title">
          Selected {{ category?.title }} projects I've worked on
        </h2>
        <p class="description">
          {{
            category?.description ||
            `Here are some of the projects I've been fortunate to work on. I've
          also included some of my personal projects.`
          }}
        </p>
      </section>
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
    </div>
  </header>
</template>
<style scoped>
.work-page-header > .wrapper {
  @apply flex  flex-wrap md:flex-row justify-between gap-12;
}

.work-page-header-content .title {
  @apply capitalize;
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
