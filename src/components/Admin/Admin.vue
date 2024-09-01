<template>
  <div class="container">
    <div v-if="!user.current">
      <Login class="login-component"/>
    </div>
    <div v-else>
      <div class="user-info">
        <p>Logged in as {{ user.current.email }}</p>
        <button @click="logout" class="logout-button">Logout</button>
      </div>
      <div class="information-page">
        <ActiveElementsCourses class="active-elements"/>
        <ActiveElementsWebinars class="active-elements"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import Login from './Login.vue';
import ActiveElementsCourses from './ActiveElementsCourses.vue';
import ActiveElementsWebinars from './ActiveElementsWebinars.vue';
import { user } from '../../store/user';

const logout = async () => {
  await user.logout();
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
  min-height: 100vh;
  background-color: #f2f2f2;
  padding: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  margin-bottom: 20px;
}

.user-info p {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.logout-button {
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.logout-button:hover {
  background-color: #e60000;
}

.login-component {
  max-width: 400px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.active-elements {
  max-width: 600px;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.information-page {
  display: grid;
  gap: 1%;
}
</style>
