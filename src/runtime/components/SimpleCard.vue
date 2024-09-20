<template>
  <section class="simpleCard">
    <NuxtImg
      :src="props.coverImage || 'scenic/placeholder.webp'"
      width="100%"
      placeholder
    />
    <h1 class="cardHeader">
      {{ props.title }}
    </h1>
    <hr>
    <p class="text-base p-2">
      <slot />
    </p>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  coverImage: {
    type: String,
  },
  title: {
    type: String,
  },
})
</script>
