<script setup>

import { onMounted, ref } from 'vue'
import { noteStore } from '@/stores/notes'
import {RouterLink} from "vue-router";
import { authStore } from "../stores/auth";

const notes = ref([])

onMounted(async () => (notes.value = await noteStore.getAllNotes()))

</script>

<template>
  <main>
    
    <h1 class="title">Notes Manager</h1>

    <div v-if="notes.length > 0 && authStore.user" class="">
      <div class="" v-for="note in notes" :key="note.id">
        <h2>{{ note.title }}</h2>
        <h4>Creator: {{ note.user.name }}</h4>
        <p>
          {{ note.body }}
          <RouterLink :to="{name: 'show', params: { id: note.id}}">Read more...</RouterLink>
        </p>
      </div>
    </div>

    <div class="" v-else-if="notes.length < 1">
      <h1>There are no posts</h1>
    </div>

  </main>
</template>
