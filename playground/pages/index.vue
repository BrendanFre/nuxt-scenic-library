<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a
      href="https://nuxt.com/docs/getting-started/routing"
      target="_blank"
    >Learn more about Nuxt Routing</a>
    <s-SimpleCard title="Sample Card">
      Hello
    </s-SimpleCard>

    <s-SimpleRating
      stars="3"
    />
    <s-SimpleRating
      stars="4"
      hide-number="no"
    />
  </div>
</template>
