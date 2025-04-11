<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { authStore } from "./stores/auth";
import { noteStore } from './stores/notes.js'
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
          <div class="">
            <RouterLink :to="{name : 'register'}" class="nav-link">Register</RouterLink>
          </div>
          <div>
            <RouterLink :to="{name : 'login'}" class="nav-link">Login</RouterLink>
          </div>
        </div>


      </nav>
  </header>

  <RouterView />

  <div class="">
    <h3>What I've Learned From This Project</h3>
    <p>
      When beginning this project, I had no experience with <strong>PHP, Laravel, Vue, Axios, or Tailwind.</strong>
      It was a significant undertaking to try to learn these different languages/frameworks in such an expedited timeframe.
      This project has helped me to get a better understanding of separation of powers between various objects <em>(For example, using a Model to handle raw data, and a ModelController to act as a gate for interacting with the Model.)</em>
      I also now have a better understanding of the basics of PHP, and the (surprisingly elegant) Laravel framework. 
      The Vue.js framework still holds some mystique, but I much prefer its <strong>ref</strong> and <strong>reactive</strong> state handling to React.js and the constant branching and passing of props through layers and layers of components.
    </p>
    <br>
    <p>
      I was challenged by <strong>Tailwind</strong> because of its recent release of v4.1. This new version appears to use different classnames than previous versions.
      This change made a lot of tutorial-based research impractical because the information would be outdated. However, I recognize that this may have been due to my lack of experience with Tailwind.
      Handling user authentication and interactions between user and user-related data was also a challenge since this was my first time attempting to implement something of that nature.
      Something that I would want to learn more about would be how to avoid having a user's plaintext login (username/password) transmit over the network to the API, since plaintext would leave it vulnerable to MITM attacks.
      Anyways, I recognize that I still have a ways to go before I can confidently say that I understand the languages/frameworks that I used to create this project, but I now have some familiarity.      
    </p>
    <h6>Jonathan Pruitt</h6>
  </div>
</template>
