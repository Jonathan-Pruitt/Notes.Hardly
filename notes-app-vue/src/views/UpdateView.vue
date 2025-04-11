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
    <h1 class="title">Update Your Note</h1>
    <form @submit.prevent="handleUpdate">
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

        <button>Update</button>
    </form>
  </main>
</template>
