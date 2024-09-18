<template>
  <section
    class="sm:w-full md:w-1/3 flex flex-col rounded simpleCard shadow-2xl text-2xl m-5 border-1"
  >
    <NuxtImg
      :src="props.coverImage || 'scenic/placeholder.webp'"
      width="100%"
      placeholder
    />
    <h1 class="text-2xl text-center">
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

<style scoped>
.simpleCard:hover{
  animation: 1s ease-in 0 1 forwards forwards zoom;
}
@keyframes zoom {
  from {
    width: 0;
    height: 0;
  }

  to {
    width: 2px;
    height: 2px;
  }
}
</style>
