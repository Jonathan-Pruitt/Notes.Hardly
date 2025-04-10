<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { authStore } from "./stores/auth";
import { onMounted } from 'vue';

onMounted(() => {
  authStore.getUser()  
})

</script>

<template>
  <header>
      <nav>
        <RouterLink :to="{ name : 'home'}" class="nav-link">Home</RouterLink>        

        <div v-if="authStore.user" class="">
          <p>Welcome Back {{ authStore.user.name }}</p>
          <form @submit.prevent="authStore.logout">
            <button>Logout</button>
          </form>

          <RouterLink :to="{name : 'create'}" class="nav-link">New Note</RouterLink>
        </div>

        <div v-else>
          <RouterLink :to="{name : 'register'}" class="nav-link">Register</RouterLink>
        </div>

        <div>
          <RouterLink :to="{name : 'login'}" class="nav-link">Login</RouterLink>
        </div>

      </nav>
  </header>

  <RouterView />
</template>
