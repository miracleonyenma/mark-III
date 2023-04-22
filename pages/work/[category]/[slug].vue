<script setup lang="ts">
const route = useRoute();
// const { category, slug } = route.params;

const { category: categorySlug, slug } = route.params;
console.log({
  categorySlug,
});

const { data, error } = await useAsyncData(
  `category-${categorySlug}-${slug}`,
  async () => {
    const category = await queryContent(
      `work`,
      categorySlug as string
    ).findOne();

    const project = await queryContent(
      `work/${categorySlug}`,
      slug as string
    ).findOne();

    return { category, project };
  }
);

console.log({ data: data.value });

// const { data: project, error } = await useAsyncData(
//   `project-${category}-${slug}`,
//   async () => {
//     const project = await queryContent(
//       `work/${category}`,
//       slug as string
//     ).findOne();

//     return project;
//   }
// );

// console.log({ data: project.value });
</script>
<template>
  <main class="site-main">
    <WorkModuleProjectPageHeader :project="data?.project" />
  </main>
</template>
<style scoped></style>
