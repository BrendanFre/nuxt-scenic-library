<template>
  <header
    class="headerStyle"
    :style="{ backgroundColor: backgroundColor }"
  >
    <div
      id="siteIdentity"
      class="siteIdentity"
    >
      <span v-if="siteLogo === ''">
        {{ siteName }}
      </span>
      <NuxtImg
        v-else
        :src="siteLogo"
        sizes="sm:48px md:98px"
        densities="1x 2x"
        alt="Site Logo"
        title="Site Logo"
        format="avif"
      />
    </div>
    <div
      id="menu"
      class="menu"
    >
      <icon
        v-if="showMobile"
        name="pajamas:hamburger"
        :style="'color:' + fontColor"
        @click="showMenu()"
      />
      <div
        :class="menuLink"
        :style="{ backgroundColor: backgroundColor }"
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
    menuLink.value = 'menuLinkShow'
  }
  else if (menuLink.value === 'hidden') {
    menuLink.value = 'showMobileMenu'
  }
  else {
    menuLink.value = 'menuLink'
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
    default: '#2d94e6',
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
// const headerStyle = ref(['flex', 'flex-row', 'justify-between', 'items-center', 'w-full', 'px-5', 'py-2', 'static', 'mb-2', 'shadow-2xl', backgroundColor, fontColor])
// const showMobileMenu = 'top-0 left-0 absolute w-screen h-screen flex flex-col justify-center items-center ' + backgroundColor
</script>
