<script lang="ts" setup>
import type { MenuObject } from './Types'
import { ref } from '#imports'

enum FooterType {
  simple,
  menu,
}
const props = defineProps({
  copyright: {
    type: String,
  },
  background: {
    type: String,
    default: '#8ad985',
  },
  color: {
    type: String,
    default: '#f3fbf2',
  },
  year: {
    type: Number,
    default: new Date().getFullYear(),
  },
  type: {
    type: String,
    default: 'simple',
  },
  menuItems: {
    type: Array<MenuObject>,
  },
})

const isValid = ref(false)
if (Object.values(FooterType).includes(props.type)) {
  isValid.value = true
}
else { throw new Error('The type specified for the footer is incorrect it can only be simple or menu') }

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
    <div v-if="props.type==='menu'">
      Menu Me
    </div>
  </div>
</template>

<style lang="postcss">
.footerContainer{
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: v-bind(background);
  color: v-bind(color);
  padding: 20px;
  position:absolute;
  left: 0;
  bottom: 0;

  @media screen and (min-width: 700px){
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 10vh;
  }
}
</style>
