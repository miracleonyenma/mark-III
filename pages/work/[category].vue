<script setup lang="ts">
const route = useRoute();
const { category } = route.params;
console.log({
  category,
});
</script>
<template>
  <main class="site-main">
    <WorkPageHeader />
    <section class="site-section">
      <div class="wrapper">
        <WorkModuleProjectList :category="category" />
      </div>
    </section>
  </main>
</template>
