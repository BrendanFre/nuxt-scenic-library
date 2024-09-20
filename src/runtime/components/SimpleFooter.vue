<script lang="ts" setup>
import { ref } from '#imports'

const props = defineProps({
  copyright: {
    type: String,
  },
  background: {
    type: String,
    default: '#8ad985',
  },
  year: {
    type: Number,
    default: new Date().getFullYear(),
  },
})

const currentYear = ref(new Date().getFullYear())
const yearString = ref()
if (props.year === currentYear.value) {
  yearString.value = currentYear
}
else {
  yearString.value = `${props.year} - ${currentYear.value}`
}
</script>

<template>
  <div class="footerContainer">
    Copyright &copy; {{ yearString }} {{ props.copyright }}
  </div>
</template>

<style lang="postcss">
.footerContainer{
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: v-bind(background);
  padding: 20px;

  @media screen and (min-width: 700px){
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 10vh;
  }
}
</style>
