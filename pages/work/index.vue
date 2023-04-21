<!-- <script setup lang="ts">
const route = useRoute();
// const { category } = route.params;
console.log(route.params);

const queryFromPath = (path: string) =>
  `/work?category=${path.split("/").pop()}`;
</script> -->
<template>
  <main class="site-main">
    <WorkPageHeader />
    <section class="site-section">
      <div class="wrapper">
        <WorkModuleProjectList />
      </div>
    </section>
  </main>
</template>
