<template>
  <div>
    <s-MainHeader site-logo="/logo.webp" font-color="text-sky-900" :page-links="links" />
  </div>
  <NuxtPage />
</template>

<script setup>
const links = reactive([{
  linkName: 'Home',
  linkAddress: '/',
},
{
  linkName: 'About',
  linkAddress: '/about',
}])
</script>
