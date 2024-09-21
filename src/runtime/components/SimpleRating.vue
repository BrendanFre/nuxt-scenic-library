<template>
  <div>
    <span
      v-if="!isHide()"
      class="starText"
    >{{ stars }}</span>
    <icon
      v-for="star in starArray"
      :key="star"
      name="fontisto:star"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from '#imports'

const props = defineProps({
  stars: {
    type: String,
    default: '0',
  },
  color: {
    type: String,
    default: 'blue',
  },
  hideNumber: {
    type: String,
    default: 'no',
  },
})

const starArray: Ref<Array<number>> = ref([])

const isHide: Ref<() => boolean> = ref(() => {
  if (props.hideNumber.toLowerCase() === 'yes') {
    return true
  }
  else return false
})

const stars: Ref<number> = ref(Number.parseInt(props.stars))

for (let i = 0; i < stars.value; i++) {
  starArray.value.push(i)
}
</script>

<style scoped></style>
