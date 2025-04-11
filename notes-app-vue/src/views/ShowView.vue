<script setup>
import { onMounted, ref } from 'vue'
import { noteStore } from '@/stores/notes'
import { authStore } from '@/stores/auth'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
const note = ref(null)

onMounted(async () => note.value = await noteStore.getNote(route.params.id))

</script>

<template>
    <main>
        <div v-if="note" class="">
            <div class="">
                <h2 class="text-2xl font-bold">{{ note.title }}</h2>
                <h4 class="py-3 text-xl font-bold">Creator: {{ note.user.name }}</h4>
                <p class="p-3 ">
                    {{ note.body }}
                </p>
                <div class="" v-if="authStore.user && authStore.user.id === note.user.id">                    
                    <div class="mt-5">
                        <RouterLink class="p-2 border rounded-lg text-white bg-blue-500 cursor-pointer" :to="{ name: 'update', params: {id : note.id}}">Update</RouterLink>
                    </div>
                    <form class="py-2 my-1 flex-1" @submit.prevent="noteStore.deleteNote(note)"> 
                        <button class="p-2 border rounded-lg text-white bg-red-700/75 cursor-pointer">Delete</button>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>