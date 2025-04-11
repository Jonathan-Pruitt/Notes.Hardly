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
                <h2>{{ note.title }}</h2>
                <h4>Creator: {{ note.user.name }}</h4>
                <p>
                    {{ note.body }}
                </p>
                <div v-if="authStore.user && authStore.user.id === note.user.id" class="">
                    <form @submit.prevent="noteStore.deleteNote(note)"> 
                        <button>Delete</button>
                    </form>

                    <RouterLink :to="{ name: 'update', params: {id : note.id}}">Update</RouterLink>
                </div>
            </div>
        </div>
    </main>
</template>