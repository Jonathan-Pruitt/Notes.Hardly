<script setup>

import { onMounted, ref } from 'vue'
import { noteStore } from '@/stores/notes'
import {RouterLink} from "vue-router";
import { authStore } from "../stores/auth";

const notes = ref([])

onMounted(async () => {
  (notes.value = await noteStore.getAllNotes())
})

</script>

<template>
  <main>
    
    <h1 class="font-sans text-base md:text-2xl font-bold tracking-wider py-3 md:mb-2">Notes Manager</h1>

    <div v-if="notes.length > 0 && authStore.user" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5 md:gap-4 min-h-[60dvh] justify-self-center">
      <div v-for="note in notes" :key="note.id" class="min-h-[125px] max-h-[275px] md:max-w-md relative border rounded-sm p-3 bg-yellow-100 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.35)]">
        <div class="flex">
          <h2 class="text-base md:text-xl font-bold flex-1 truncate">{{ note.title }}</h2>
          <h4 class="text-base md:text-xl font-semibold truncate">Creator: {{ note.user.name }}</h4>
        </div>
        <p class="max-h-8/10 truncate text-wrap text-sm md:base">
          {{ note.body }}
        </p>
        <div class="absolute bottom-0 font-mono text-blue-900/60 text-base tracking-[-0.1em]">Updated: {{ note.updated_at.slice(0,10) }}</div>
        <div class="absolute bottom-0 right-2 text-blue-900 font-mono text-lg">
          <RouterLink :to="{name: 'show', params: { id: note.id}}">View/Edit</RouterLink>
        </div>
      </div>
    </div>

    <div class="" v-else-if="notes.length < 1">
      <h1>There are no posts</h1>
    </div>

  </main>
</template>
