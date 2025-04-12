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
    <h1 class="font-sans text-base md:text-2xl font-bold tracking-wider py-3 md:mb-2">Login</h1>

    <form class="justify-self-center  min-w-[60vw]" @submit.prevent="handleLogin">
        
        <div class="grid-cols-2 grid">
            <label class="justify-self-center text-lg tracking-widest font-bold p-1 m-1 flex-1" for="Email">Email</label>
            <input class="py-1 px-3 m-1 bg-white border rounded-sm" type="email" v-model="formData.email" placeholder="Email">
        </div>
        <p class="justify-self-center text-[#ff0000]" v-if="authStore.errors.email">{{ authStore.errors.email }}</p>
        
        <div class="grid-cols-2 grid">
            <label class="justify-self-center text-lg tracking-widest font-bold p-1 m-1 flex-1" for="Password">Password</label>
            <input class="py-1 px-3 m-1 bg-white border rounded-sm" type="password" v-model="formData.password" placeholder="Password">
        </div>
        <p class="justify-self-center text-[#ff0000]" v-if="authStore.errors.password">{{ authStore.errors.password }}</p>
        
        <button class="p-2 flex justify-self-center border border-blue-900 rounded-lg text-white bg-blue-500 cursor-pointer">Login</button>
    </form>
  </main>
</template>
