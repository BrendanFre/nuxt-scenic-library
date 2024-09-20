<script setup lang="ts">
const links = reactive([{
  linkName: 'Home',
  linkAddress: '/',
}])
</script>

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
    <s-SimpleFooter
      copyright="Brendan"
      type="menu"
      :menu-items="[{ linkName: 'Home', linkAddress: '/' }]"
    />
  </div>
</template>
