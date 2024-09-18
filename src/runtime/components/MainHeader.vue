<template>
  <header :class="headerStyle">
    <div
      id="siteIdentity" class="flex justify-center items-center"
    >
      <span v-if="siteLogo === ''">
        {{ siteName }}
      </span>
      <NuxtImg
        v-else
        :src="siteLogo"
        sizes="sm:15vw"
        densities="1x 2x"
        alt="Site Logo"
        title="Site Logo"
        format="avif"
      />
    </div>
    <div
      id="menu"
      class="flex justify-center items-center"
    >
      <icon
        v-if="showMobile"
        name="pajamas:hamburger"
        :style="'color:' + fontColor"
        @click="showMenu()"
      />
      <div
        :class="menuLink"
        @click.prevent="showMenu"
      >
        <NuxtLink
          v-for="link in pageLinks"
          :key="link.linkAddress"
          :to="link.linkAddress"
        >
          {{ link.linkName }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from '#imports'

const showMobile = ref(false)
const menuLink = ref()

function pageDetect() {
  const pageWidth: number = window.innerWidth
  if (pageWidth > 640) {
    showMobile.value = false
    menuLink.value = 'visible flex'
  }
  else {
    showMobile.value = true
    menuLink.value = 'hidden'
  }
}

function showMenu() {
  if (!showMobile.value) {
    menuLink.value = 'visible flex'
  }
  else if (menuLink.value === 'hidden') {
    menuLink.value = showMobileMenu
  }
  else {
    menuLink.value = 'hidden'
  }
}

onMounted(() => {
  pageDetect()
  window.addEventListener('resize', pageDetect)
})

interface linkObject {
  linkName: string
  linkAddress: string
}

const { siteName, backgroundColor, fontColor, siteLogo } = defineProps({
  siteName: {
    type: String,
    default: 'My Site',
  },
  backgroundColor: {
    type: String,
    default: 'bg-blue-200',
  },
  fontColor: {
    type: String,
    default: 'text-blue-900',
  },
  siteLogo: {
    type: String,
    default: '',
  },
  pageLinks: {
    type: Array<linkObject>,
    default: () => [],
  },
})

const headerStyle = ref(['flex', 'flex-row', 'justify-between', 'items-center', 'w-full', 'px-5', 'py-2', 'top-0', 'left-0', 'fixed', 'mb-2', 'shadow-2xl', backgroundColor, fontColor])
const showMobileMenu = 'top-0 left-0 absolute w-screen h-screen flex flex-col justify-center items-center ' + backgroundColor
</script>

<style scoped>
</style>
