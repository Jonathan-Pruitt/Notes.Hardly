<script setup>
import { reactive } from 'vue';
import { noteStore } from '@/stores/notes.js'

const formData = reactive({
    title: '',
    body: '',    
})

async function handleNotes() {
    await noteStore.createNote(formData)
}

</script>

<template>
  <main>
    <h1 class="font-sans text-base md:text-2xl font-bold tracking-wider py-3 md:mb-2">Create a Note</h1>

    <form @submit.prevent="handleNotes">
        <div class="flex justify-self-center">
            <label class="p-3 m-1 flex-1" for="Title">Title</label>
            <input class="p-1 m-1 bg-white border" type="text" placeholder="Title" v-model="formData.title">
            <p v-if="noteStore.errors.title">{{ noteStore.errors.title }}</p>
        </div>

        <div class="flex justify-self-center">
            <label class="p-3 m-1 flex-1" for="Body">Body</label>
            <textarea class="p-1 m-1 bg-white border" name="body" id="body" placeholder="Details..." v-model="formData.body"></textarea>
            <p v-if="noteStore.errors.body">{{ noteStore.errors.body }}</p>
        </div>

        <button class="p-2 flex justify-self-center border rounded-lg text-white bg-blue-500 cursor-pointer">Create Note</button>
    </form>
  </main>
</template>
