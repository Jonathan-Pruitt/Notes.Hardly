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
    <h1 class="title">Create a Note</h1>

    <form @submit.prevent="handleNotes">
        <div class="">
            <label for="Title">Title</label>
            <input type="text" placeholder="Title" v-model="formData.title">
            <p v-if="noteStore.errors.title">{{ noteStore.errors.title }}</p>
        </div>

        <div class="">
            <label for="Body">Body</label>
            <textarea name="body" id="body" v-model="formData.body"></textarea>
            <p v-if="noteStore.errors.body">{{ noteStore.errors.body }}</p>
        </div>

        <button>Create Note</button>
    </form>
  </main>
</template>
