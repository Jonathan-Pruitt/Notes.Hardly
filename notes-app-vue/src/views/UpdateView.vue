<script setup>
import { onMounted, ref, reactive } from 'vue'
import { noteStore } from '@/stores/notes.js'
import { useRoute, useRouter } from 'vue-router'
import { authStore } from "@/stores/auth.js";

const route = useRoute()
const router = useRouter()
const user = authStore.user
const formData = reactive({
    title: '',
    body: '',    
})

const note = ref(null)

async function handleUpdate() {
    await noteStore.updateNote(note.value, formData)
}

onMounted(async () => {
    note.value = await noteStore.getNote(route.params.id)

    if (user.id !== note.value.user_id) {

        router.push({name : 'home'})

    } else {
        formData.title = note.value.title
        formData.body = note.value.body
    }
})

</script>

<template>
  <main>
    <h1 class="font-sans text-base md:text-2xl font-bold tracking-wider py-3 md:mb-2">Update Your Note</h1>    
    
    <form class="justify-self-center min-w-[60vw]" @submit.prevent="handleUpdate">        
        <div class="grid-cols-2 grid">
            <label class="justify-self-center text-lg tracking-widest font-bold p-1 m-1 flex-1" for="Title">Title</label>
            <input class="py-1 px-3 m-1 bg-white border rounded-sm" type="text" placeholder="Title" v-model="formData.title">
        </div>
        <p class="justify-self-center text-[#ff0000]" v-if="noteStore.errors.title">{{ noteStore.errors.title }}</p>

        <div class="grid-cols-2 grid">
            <label class="justify-self-center text-lg tracking-widest font-bold p-3 m-1 flex-1" for="Body">Body</label>
            <textarea class="py-1 px-3 m-1 bg-white border rounded-sm" name="body" id="body" v-model="formData.body"></textarea>
        </div>
        <p class="justify-self-center text-[#ff0000]" v-if="noteStore.errors.body">{{ noteStore.errors.body }}</p>

        <button class="p-2 flex justify-self-center border border-blue-900 rounded-lg text-white bg-blue-500 cursor-pointer">Update</button>
    </form>
  </main>
</template>
