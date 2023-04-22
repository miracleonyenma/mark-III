<script setup lang="ts">
const { category } = defineProps<{
  category?: string | string[];
}>();
</script>
<template>
  <ul class="project-list">
    <ContentList
      :path="`/work${category ? `/${category}` : ``}`"
      :query="{
        only: ['title', '_path', '_id', 'description', 'coverImage'],
        where: [{ _id: { $not: { $contains: 'index' } } }],
      }"
    >
      <template v-slot="{ list }">
        <li v-for="work in list" :key="work._path" class="project-item">
          <NuxtLink :to="work?._path">
            <WorkModuleProjectCard :work="work" />
          </NuxtLink>
        </li>
      </template>
      <!-- Not found slot to display message when no content us is found -->
      <template #not-found>
        <p>Oops! Nothing to see here 🙈</p>
      </template>
    </ContentList>
  </ul>
</template>
<style scoped>
.project-list {
  @apply flex flex-wrap gap-4;
}

.project-item {
  @apply w-full md:w-[calc(((1/2)*100%)-(1/2)*1rem)] lg:w-[calc(((1/3)*100%)-(2/3)*1rem)] mt-0;
}

.project-item:nth-of-type(2n + 1) {
  @apply md:-mt-8 md:mb-8;
  @apply lg:-mt-0 lg:mb-0;
}

.project-item:nth-of-type(3n + 2) {
  @apply lg:-mt-8 lg:mb-8;
}
</style>
