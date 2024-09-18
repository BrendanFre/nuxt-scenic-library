<template>
  <section class="w-1/4 rounded shadow-2xl text-2xl">
    <NuxtImg
      :src="props.coverImage"
      placeholder
    />
    <slot />
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  coverImage: {
    type: String,
  },
})
</script>

<style scoped>

</style>
