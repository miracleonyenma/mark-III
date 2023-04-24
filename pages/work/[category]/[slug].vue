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
    const categoryQuery = queryContent(`work`, categorySlug as string);

    const projectQuery = queryContent(`work/${categorySlug}`, slug as string);
    // https://github.com/nuxt/content/issues/1368
    // https://github.com/nuxt/content/issues/1368#issuecomment-1191310455
    const [category, project] = await Promise.all([
      categoryQuery.findOne(),
      projectQuery.findOne(),
    ]);

    return { category, project };
  }
);

console.log({ data: data.value, error: error.value });
</script>
<template>
  <main class="site-main">
    <WorkModuleProjectPageHeader :project="data?.project" />
  </main>
</template>
<style scoped></style>
