<script setup lang="ts">
const links = reactive([{
  linkName: 'Home',
  linkAddress: '/',
}])
</script>

<template>
  <div>
    <<<<<<< HEAD
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a
      href="https://nuxt.com/docs/getting-started/routing"
      target="_blank"
    >Learn more about Nuxt Routing</a>
    <s-SimpleCard title="Sample Card">
      Hello
    </s-SimpleCard>
    =======
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
    >>>>>>> origin/main
  </div>
</template>
