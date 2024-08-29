<template>
  <div v-if="!user.current">
    <Login />
  </div>
  <div v-else="user.current">
    <div>
      <p v-if="user.current">Logged in as {{ user.current.email }}</p>
      <button @click="logout">Logout</button>
    </div>

    <ActiveElements />
  </div>

</template>

<script setup>
  import Login from './Login.vue';
  import ActiveElements from './ActiveElements.vue';
  import { user } from '../store/user';

  const logout = async () => {
    await user.logout();
  };

</script>

<style scoped>

</style>