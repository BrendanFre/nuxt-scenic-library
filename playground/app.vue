<template>
  <div>
    <s-MainHeader
      site-logo="/logo.webp"
      font-color="text-sky-900"
      :page-links="links"
    />
    <s-SimpleCard>
      Hello
    </s-SimpleCard>
  </div>
  <NuxtPage />
</template>

<script setup>
const links = reactive([{
  linkName: 'Home',
  linkAddress: '/',
}])
</script>
