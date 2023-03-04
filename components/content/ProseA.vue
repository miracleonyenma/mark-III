<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: ''
  },
  target: {
    type: String,
    default: "_blank",
    required: false
  }
})
</script>

<template>
  <NuxtLink class="custom" :href="href" :target="target">
    <slot />
  </NuxtLink>
</template>