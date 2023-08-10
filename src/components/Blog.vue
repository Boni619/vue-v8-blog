<template>
  <v-container>
    <v-row justify="center">
  <v-card shaped class="rounded-card mx-auto mt-5"
  v-for="entrie in entries" :key="entrie.id" data-test="entrie">

  <v-card-title>{{entrie.title}}</v-card-title>
  <v-card-subtitle>Tadit Dash is an Indian by heart, a Software Engineer by profession, an Author and a Speaker by passion.</v-card-subtitle>
  <v-card-actions>
  </v-card-actions>
  </v-card>
  </v-row>
  </v-container>

</template>

<script setup>
import {ref} from 'vue'
import blogData from '../blog_store/posts_index.json'
 const entries = ref(blogData);
</script>
