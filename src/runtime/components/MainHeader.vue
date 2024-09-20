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
    <div class="menu">
      <icon
        v-if="showMobile"
        id="menuIcon"
        name="pajamas:hamburger"
        :style="'color:' + fontColor"
        @click="showMenu()"
      />
      <div
        id="menu"
        class="hide"
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
  const menu = document.querySelector('#menu') as HTMLDivElement
  const menuIcon = document.querySelector('#menuIcon') as HTMLLIElement
  menu.classList.toggle('hide')
  menu.classList.toggle('show')
  menuIcon.classList.toggle('hideIcon')
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
</script>
