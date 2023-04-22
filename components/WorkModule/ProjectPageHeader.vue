<script setup lang="ts">
import { ParsedContent } from "@nuxt/content/dist/runtime/types";

const { project } = defineProps<{
  project: ParsedContent | null | undefined;
}>();
useHead({
  title: project?.title,
  meta: [
    {
      name: "description",
      content: project?.description,
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
      content: `https://v3.miracleio.me${project?._path}`,
    },
    {
      key: "og-title",
      property: "og:title",
      content: project?.title,
    },
    {
      key: "og-description",
      property: "og:description",
      content: project?.description,
    },
    {
      key: "og-image",
      property: "og:image",
      content: `https://v3.miracleio.me${project?.coverImage}`,
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
      content: `https://miracleio.me${project?._path}`,
    },
    {
      key: "twitter-title",
      property: "twitter:title",
      content: project?.title,
    },
    {
      key: "twitter-description",
      property: "twitter:description",
      content: project?.description,
    },
    {
      key: "twitter-image",
      property: "twitter:image",
      content: `https://v3.miracleio.me${project?.coverImage}`,
    },
  ],
});
</script>
<template>
  <header
    class="page-header project-page-header site-section site-section-header"
  >
    <div class="wrapper">
      <figure class="img-cont">
        <img :src="project?.coverImage" alt="" />
      </figure>
      <section class="project-page-header-content">
        <h1 class="title">
          {{ project?.title }}
        </h1>
        <p class="description">
          {{ project?.summary || project?.description }}
        </p>
      </section>
    </div>
  </header>
</template>
<style scoped>
.project-page-header {
  @apply p-0;
}
.project-page-header > .wrapper {
  @apply grid md:grid-cols-7 items-center m-0 max-w-none;
}

.project-page-header > .wrapper > * {
  @apply max-w-none;
}

.project-page-header .img-cont {
  @apply md:col-span-4;
}

.project-page-header .img-cont img {
  @apply rounded-3xl md:rounded-l-none;
}

.project-page-header-content {
  @apply md:col-span-3 p-4 md:p-8;
}
</style>
