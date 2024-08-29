<template>
  <router-view />
</template>

<script setup>
  import { onMounted } from 'vue';
  import { useDataStore } from './store/DataStore';
  import { RouterView } from 'vue-router';
  import { user } from "./store/user";

  const store = useDataStore();

  onMounted(() => {
    user.init();
  });
</script>

<style scoped>

</style>
