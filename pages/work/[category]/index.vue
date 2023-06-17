<script setup lang="ts">
const route = useRoute();
const { category: categorySlug } = route.params;
console.log({
  categorySlug,
});

const { data, error } = await useAsyncData(
  `category-${categorySlug}`,
  async () => {
    const category = await queryContent(
      `work`,
      categorySlug as string
    ).findOne();

    return { category };
  }
);

console.log({ data: data.value });
</script>
<template>
  <main class="site-main">
    <WorkModuleWorkPageHeader :category="data?.category" />
    <section class="site-section">
      <div class="wrapper">
        <WorkModuleProjectList :category="categorySlug" />
      </div>
    </section>
  </main>
</template>
