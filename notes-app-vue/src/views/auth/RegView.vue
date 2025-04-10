<script setup>

import {reactive} from "vue";
import {authStore} from '@/stores/auth';

const formData = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

async function handleRegister() {
    await authStore.authenticate('register', formData);
}

</script>

<template>
  <main>
    <h1 class="title">Register a new account</h1>

    <form @submit.prevent="handleRegister">

        <div class="">
            <label for="Name">Name</label>
            <input type="text" v-model="formData.name" placeholder="Name">            
            <p v-if="authStore.errors.name">{{ authStore.errors.name }}</p>
        </div>
        
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

        <div class="">
            <label for="Confirm-Password">Confirm Password</label>
            <input type="password" v-model="formData.password_confirmation" placeholder="Confirm Password">
        </div>
        
        <button class="primary-btn">Register</button>
    </form>
  </main>
</template>
