<script setup>

import {reactive} from "vue";
import {authStore} from '@/stores/auth';

const formData = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

let matchPassword = ''

async function handleRegister() {
    await authStore.authenticate('register', formData);
    console.log(authStore.errors)
}

</script>

<template>
  <main>
    <h1 class="font-sans text-base md:text-2xl font-bold tracking-wider py-3 md:mb-2">Register a New Account</h1>

    <form @submit.prevent="handleRegister">

        <div class="flex justify-self-center">
            <label class="py-1 px-3 m-1 flex-1" for="Name">Name</label>
            <input class="p-1 m-1 bg-white border rounded-sm" type="text" v-model="formData.name" placeholder="Name">            
            <p v-if="authStore.errors.name">{{ authStore.errors.name }}</p>
        </div>
        
        <div class="flex justify-self-center">
            <label class="py-1 px-3 m-1 flex-1" for="Email">Email</label>
            <input class="p-1 m-1 bg-white border rounded-sm" type="email" v-model="formData.email" placeholder="Email">
            <p v-if="authStore.errors.email">{{ authStore.errors.email }}</p>
        </div>
        
        <div class="flex justify-self-center">
            <label class="py-1 px-3 m-1 flex-1" for="Password">Password</label>
            <input class="p-1 m-1 bg-white border rounded-sm" type="password" v-model="formData.password" placeholder="Password">
            <p v-if="authStore.errors.password">{{ authStore.errors.password }}</p>
        </div>

        <div class="flex justify-self-center">
            <label class="py-1 px-3 m-1 flex-1" for="Confirm-Password">Confirm Password</label>
            <input class="p-1 m-1 bg-white border rounded-sm" type="password" v-model="formData.password_confirmation" placeholder="Confirm Password">
        </div>
        
        <button class="p-2 flex justify-self-center border rounded-lg text-white bg-blue-500 cursor-pointer">Register</button>
    </form>
  </main>
</template>
