<template>
  <header class="headerStyle">
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

const backColor = ref(backgroundColor)

// const headerStyle = ref(['flex', 'flex-row', 'justify-between', 'items-center', 'w-full', 'px-5', 'py-2', 'static', 'mb-2', 'shadow-2xl', backgroundColor, fontColor])
const showMobileMenu = 'top-0 left-0 absolute w-screen h-screen flex flex-col justify-center items-center ' + backgroundColor
</script>

<style scoped lang="postcss">
::placeholder{
  background-color: gray;
}
.siteIdentity{
  display: flex;
  justify-content: center;
  align-items: center;
}
.headerStyle{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 20px 5px;
  position: static;
  background-color: v-bind(backColor);
  margin: 0;
  box-shadow:10px 5px 5px black ;
  @media screen and (min-width: 500px){
    .headerStyle{
      height: 100px;
      padding: 40px 5px;
    }
  }
}

.menu{
display: flex;
justify-content: center;
align-items: center;
}
</style>
