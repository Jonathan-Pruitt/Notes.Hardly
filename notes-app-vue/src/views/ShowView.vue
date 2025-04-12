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
            <div class="p-5 border rounded-sm p-3 bg-yellow-100 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.35)]">
                <div class="flex">
                    <h2 class="flex-1 text-lg md:text-3xl font-bold">{{ note.title }}</h2>
                    <h4 class="text-lg md:text-xl font-bold">Creator: {{ note.user.name }}</h4>
                </div>
                <p class="p-3 ">
                    {{ note.body }}
                </p>
                <div class="flex relative md:grid md:grid-cols-2 md:gap-[10vw] md:justify-self-center" v-if="authStore.user && authStore.user.id === note.user.id">                    
                    <div class="flex-1 md:self-center md:flex-none">
                        <RouterLink class="absolute md:relative p-2 border border-blue-900 rounded-lg text-white bg-blue-500 cursor-pointer" :to="{ name: 'update', params: {id : note.id}}">Update</RouterLink>
                    </div>
                    <div class="">
                        <form class="" @submit.prevent="noteStore.deleteNote(note)"> 
                            <button class="p-2 border border-red-900 rounded-lg text-white bg-red-700/75 cursor-pointer">Delete</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>