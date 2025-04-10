<script setup>

import {reactive} from "vue";
import {authStore} from '@/stores/auth';

const formData = reactive({
    email: '',
    password: '',
});

async function handleLogin() {
    await authStore.authenticate('login', formData);
}

</script>

<template>
  <main>
    <h1 class="title">Login</h1>

    <form @submit.prevent="handleLogin">
        
        <div class="">
            <label for="Email">Email</label>
            <input type="email" v-model="formData.email" placeholder="Email">
            <p v-if="authStore.errors.email">{{ authStore.errors.email }}</p>
        </div>
        
        <div class="">
            <label for="Password">Password</label>
            <input type="password" v-model="formData.password" placeholder="Password">
            <p v-if="authStore.errors.password">{{ authStore.errors.password }}</p>
        </div>
        
        <button class="primary-btn">Login</button>
    </form>
  </main>
</template>
