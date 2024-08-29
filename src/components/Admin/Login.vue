<template>
  <div>
    <h1>Login</h1>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { user } from '../store/user';

  const email = ref('');
  const password = ref('');

  const login = async () => {
    await user.login(email.value, password.value);
  };

  onMounted(async () => {
    await user.init();
  });
</script>

<style scoped>
  /* Ваши стили */
</style>
